from flask import Flask, render_template, request
from careers import careers

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/recommend', methods=['POST'])
def recommend():

    user_skills = request.form['skills'].lower().split(',')

    study_hours = int(request.form['hours'])

    experience = request.form['experience']

    course = request.form['course']

    interest = request.form['interest']

    results = []

    for career in careers:

        matched_skills = []

        for skill in user_skills:

            skill = skill.strip()

            if skill in career["skills"]:

                matched_skills.append(skill)

        match_score = len(matched_skills)

        if study_hours >= career["min_hours"]:

            utility = match_score * study_hours

            percentage = int(
                (match_score / len(career["skills"])) * 100
            )

            results.append({

                "career": career,

                "utility": utility,

                "percentage": percentage,

                "matched_skills": matched_skills

            })

    # If no career matches
    if len(results) == 0:

        return render_template(
            "result.html",
            career={
                "name": "No Suitable Career Found",
                "description": "Try adding more skills or increasing study hours.",
                "salary": "-",
                "demand": "-",
                "roadmap": []
            },
            percentage=0,
            probability=0,
            matched_skills=[],
            missing_skills=[],
            top3=[],
            experience=experience,
            course=course,
            interest=interest
        )

    # Sort by utility score
    results.sort(
        key=lambda x: x["utility"],
        reverse=True
    )

    top3 = results[:3]

    best = top3[0]

    career = best["career"]

    missing_skills = []

    for skill in career["skills"]:

        if skill not in best["matched_skills"]:

            missing_skills.append(skill)

    probability = min(
        best["percentage"] + 20,
        100
    )

    return render_template(

        "result.html",

        career=career,

        percentage=best["percentage"],

        probability=probability,

        matched_skills=best["matched_skills"],

        missing_skills=missing_skills,

        top3=top3,

        experience=experience,

        course=course,

        interest=interest

    )


if __name__ == "__main__":
    app.run(debug=True)