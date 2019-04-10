'use strict'
angular.module('OwnResume').factory('ResumeService', function () {
    const db=firebase.firestore();
    const userInfoDb=db.collection('resume').doc('bdVY1MagRoKIQeVyYn5z');
    const contactInfoDb=db.collection('contactEntity').doc('5jNPvOhgxK4uKeZ8xBu6');
    const educationDetailsDb=db.collection('educationDetails').doc('KRqNyWAaq6cHfotwVz19');
    const userExperienceDetailsDb=db.collection('experienceDetails').doc('stEA6l2VcXH9iZywZ06N');
    const userInterestsDb=db.collection('interestEntity').doc('GhlI31gm5bmFy9eWWW0y');
    const professionalSkillDb=db.collection('professionalEntity').doc('FtCi8hegXtAdYH6RcK1L');
    const personalSkillDb=db.collection('personalSkillEntity').doc('1XymHfGBEBx7fX90dMFK');
    const softwareSkillDb=db.collection('softwareSkillEntity').doc('1USlKmjiCJH5m7sjADq1');
    const userTabDb=db.collection('tabEntity').doc('EG9S4sdkG4lZHSUiCc3A');
    const imageDb=db.collection('images').doc('DUcQfIsPglAOYYq8kYq1');

    var ApiEndPoint ={
      userInfoApiEndPoint:userInfoDb,
      contactInfoApiEndPoint:contactInfoDb,
      educationDetailsApiEndPoint:educationDetailsDb,
      userExperienceDetailsApiEndPoint:userExperienceDetailsDb,
      userInterestsApiEndPoint:userInterestsDb,
      professionalSkillApiEndPoint:professionalSkillDb,
      personalSkillApiEndPoint:personalSkillDb,
      softwareSkillApiEndPoint:softwareSkillDb,
      userTabApiEndPoint:userTabDb,
        imageApiEndPoint:imageDb
    }
    
    var getOptions={
        source:"default"|| "cache" || "server"
    }

    return {
      getResumeList:function(){
        return userInfoDb.get(getOptions).then(doc=>{
          return doc.data()
        })
      },
 
      getContactList:function(){
        return contactInfoDb.get(getOptions).then(doc=>{
          return doc.data()
        })
      },

      getEducationList:function(){
        return educationDetailsDb.get(getOptions).then(doc=>{
          return doc.data()
        })
      },

      getExperienceList:function(){
         return userExperienceDetailsDb.get(getOptions).then(doc=>{
           return doc.data()
         })
      },
  

      getInterestList:function(){
        return userInterestsDb.get(getOptions).then(doc=>{
          return doc.data()
        })
      },

      getProfessionalList:function(){
        return professionalSkillDb.get(getOptions).then(doc=>{
             return doc.data()
          })
       },

       getpersonalSkill:function(){
        return personalSkillDb.get(getOptions).then(doc=>{
             return doc.data()
          })
       },

       getsoftwareSkillList:function(getOptions){
        return softwareSkillDb.get(getOptions).then(doc=>{
             return doc.data()
          })
       },

       getuserTabList:function(){
        return userTabDb.get(getOptions).then(doc=>{
             return doc.data()
          })
       },

        getprofileImage:function(){
          return imageDb.get(getOptions).then(doc=>{
                  return doc.data()
          })
        },
      ApiEndPoint
      

     
    }
    
   
});
