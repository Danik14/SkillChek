class Person {
  constructor(id, skills, desires) {
    this.id = id;
    this.skills = skills;
    this.desires = desires;
  }

  match(person) {
    const OtherSkills = person.skills;
    const OtherDesires = person.desires;

    let matchedSkills = [];
    let matchedDesires = [];
    let canLearn = [];
    let canTeach = [];

    for (let i = 0; i < this.skills.length; i++) {
      if (OtherSkills.includes(this.skills[i])) {
        matchedSkills.push(this.skills[i]);
      }
    }

    for (let i = 0; i < this.desires.length; i++) {
      if (OtherDesires.includes(this.desires[i])) {
        matchedDesires.push(this.desires[i]);
      }
    }

    for (let i = 0; i < this.desires.length; i++) {
      if (OtherSkills.includes(this.desires[i])) {
        canLearn.push(this.desires[i]);
      }
    }

    for (let i = 0; i < this.skills.length; i++) {
      if (OtherDesires.includes(this.skills[i])) {
        canTeach.push(this.skills[i]);
      }
    }

    return {
      matchedSkills: matchedSkills,
      matchedDesires: matchedDesires,
      canLearn: canLearn,
      canTeach: canTeach,
    };
  }
}

// let Alibek = new Person(
//   1,
//   ["algorithms", "media technologies", "crossfit"],
//   ["anime", "billy", "gym", "some desire"]
// );
// let Maxat = new Person(
//   2,
//   ["anime", "berserk", "gym", "algorithms"],
//   ["media technologies", "digital journalism", "reports", "some desire"]
// );

// console.log(Alibek.match(Maxat));

export default Person;
