'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    */
   return queryInterface.bulkInsert('Stories', [
     {
    title: 'title for Stef\'s story',
    content: 'The dog is a classic example of a domestic animal that likely travelled a commensal pathway into domestication. The questions of when and where dogs were first domesticated have taxed geneticists and archaeologists for decades. Genetic studies suggest a domestication process commencing over 25,000 years ago, in one or several wolf populations in either Europe, the high Arctic, or eastern Asia. In 2021, a literature review of the current evidence infers that the dog was domesticated in Siberia 23,000 years ago by ancient North Siberians, then later dispersed eastward into the Americas and westward across Eurasia.',
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    title: 'title for Diana\'s story',
    content: 'This timing indicates that the dog was the first species to be domesticated in the time of hunter–gatherers, which predates agriculture. DNA sequences show that all ancient and modern dogs share a common ancestry and descended from an ancient, extinct wolf population which was distinct from the modern wolf lineage. Most dogs form a sister group to the remains of a Late Pleistocene wolf found in the Kessleroch cave near Thayngen in the canton of Schaffhausen, Switzerland, which dates to 14,500 years ago. The most recent common ancestor of both is estimated to be from 32,100 years ago. This indicates that an extinct Late Pleistocene wolf may have been the ancestor of the dog, with the modern wolf being the dog\'s nearest living relative.',
    user_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    },

    {
    title: 'title for Jun\'s story',
    content: 'The dog\'s skull has identical components regardless of breed type, but there is significant divergence in terms of skull shape between types. The three basic skull shapes are the elongated dolichocephalic type as seen in sighthounds, the intermediate mesocephalic or mesaticephalic type, and the very short and broad brachycephalic type exemplified by mastiff type skulls.',
    user_id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    title: 'title for Kagen\'s story',
    content: 'The generally accepted earliest dog remains were discovered in Bonn-Oberkassel, Germany. Contextual, isotopic, genetic, and morphological evidence shows that this dog was not a local wolf. The dog was dated to 14,223 years ago and was found buried along with a man and a woman, all three having been sprayed with red hematite powder and buried under large, thick basalt blocks. The dog had died of canine distemper. Earlier remains dating back to 30,000 years ago have been described as Paleolithic dogs but their status as dogs or wolves remains debated because considerable morphological diversity existed among wolves during the Late Pleistocene',
    user_id: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Stories', null, {});
  }
};
