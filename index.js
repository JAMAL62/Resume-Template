angular.module('OwnResume', ['ngFileUpload']).controller('OwnResumeController', function ($scope, $timeout, ResumeService) {
  $scope.isNone = false
  $scope.isLoad = true
  $scope.isPrintDiv = true;
  $scope.isProfile = true;
  document.body.style.backgroundColor = "bisque"
  $scope.resumeInfo = {
    userInfo: {}
  }
  $scope.contactInfo = []
  $scope.image = ""
  $scope.educationDetails = []
  $scope.userExperienceDetails = []
  $scope.userInterests = []
  $scope.personalSkills = []
  $scope.softwareSkills = []
  $scope.menuItems = []
  $scope.tabs = []

  $scope.onDownloadCv = function () {
    var pDiv = document.querySelector(".parentDiv");
    $scope.isPrintDiv = false
    var a4 = [595.28, 841.89]
    html2canvas(pDiv, {
      logging: true,
      allowTaint: false,
      useCORS: true
    }).then(canvas => {
      var img = new Image()
      img = canvas.toDataURL('image/png');
      var doc = new jsPDF('p', 'mm', [canvas.width, canvas.height - 841.89]);
      doc.addImage(img, 'JPEG', 60, 0);
      doc.save($scope.resumeInfo.userInfo.userName + ' .pdf');
      pdfCompelte()
    });
  }


  $scope.onEdit = function () {
    $scope.inlineEdit = !$scope.inlineEdit
    $scope.contactEdit = !$scope.contactEdit
    $scope.introText = !$scope.introText
    $scope.educationDetails.forEach(function (education, index) {
      education.eduDetail = !education.eduDetail
    });
    $scope.userExperienceDetails.forEach(function (experience, index) {
      experience.userExp = !experience.userExp
    });
    $scope.userInterests.forEach(function (interest, index) {
      interest.userIsActive = ! interest.userIsActive
    });
    $scope.tabs.forEach(function (tab, index) {
      tab.tabActive = !tab.tabActive
    });
    $scope.isSkillEdit = !$scope.isSkillEdit
    $scope.isPersonalSkill = !$scope.isPersonalSkill;
    $scope.isSoftwareSkill = !$scope.isSoftwareSkill
  }

  $scope.onUserInfoUpdate = function (userInfo) {
    for (var user in userInfo) {
      if (userInfo[user] == "") {
        userInfo[user] = $scope.editUserName[user]
      }
    }
    userInfoDbUpate(userInfo)
    $scope.inlineEdit = false
  }

  $scope.onUserInfoCancel = function (info) {
    for (var user in info) {
      if (info[user] == "") {
        info[user] = $scope.editUserName[user]
      }
    }

    $scope.inlineEdit = false
  }

  $scope.onUserContactUpdate = function (contactList) {
    contactList.forEach(function (contact, index) {
      if (contact.name == "") {
        contact.name = $scope.editContactName[index].name;
      }
    });
    contactInfoDbUpdate(contactList)
    $scope.contactEdit = false
  }


  $scope.onUserIntroUpdate = function (introInfo) {
    for (var intro in introInfo) {
      if (introInfo[intro] == "") {
        introInfo[intro] = $scope.editUserName[intro]
      }
    }
    userIntroDbUpate(introInfo)
    $scope.introText = false
  }

  $scope.onUserEduUpdate = function (eduInfo, index) {
    for (var edu in eduInfo) {
      if (eduInfo[edu] == "") {
        eduInfo[edu] = $scope.editEducationDetails[index][edu]
       }
      }
    $scope.educationDetails[index].eduDetail = false
    userEduDbUpdate($scope.educationDetails)
  }


  $scope.onSkillUpdate = function (skillList) {
    skillList.forEach(function (skillInfo, index) {
      for (var skill in skillInfo) {
        if (skillInfo[skill] == "") {
          skillInfo[skill] = $scope.editSkillDetails[index][skill]
        }
      }
    });
    $scope.isSkillEdit = false
    userProfessSkillDbUpdate($scope.isSkillEdit)
  }

  $scope.onPersonalSkillUpdate = function (personalList) {
    personalList.forEach(function (personalInfo, index) {
      for (var personal in personalInfo) {
        if (personalInfo[personal] == "") {
          personalInfo[personal] = $scope.editPersonalSkills[index][personal]
        }
      }
    });
    $scope.isPersonalSkill = false
    userPersonalSkillDbUpdate($scope.isPersonalSkill)
   
  }


  $scope.onSoftwareSkillUpdate = function (softwareList) {
    softwareList.forEach(function (softwareInfo, index) {
      for (var software in softwareInfo) {
        if (softwareInfo[software] == "") {
          softwareInfo[software] = $scope.editSoftwareSkills[index][software]
        }
      }
    });
    $scope.isSoftwareSkill = false
    userSoftwareSkillDbUpdate($scope.isSoftwareSkill)
  }

  $scope.onUserExpUpdate = function (expInfo, index) {
    for (var exp in expInfo) {
      if (expInfo[exp] == "") {
        expInfo[exp] = $scope.editExperienceDetails[index][exp]
      }
     }
    $scope.userExperienceDetails[index].userExp = false;
    userExpDbUpdate($scope.userExperienceDetails)
  }




  $scope.onInterestUpdate = function (hobbieInfo, index) {
   for (var hob in hobbieInfo) {
      if (hobbieInfo[hob] == "") {
        hobbieInfo[hob] = $scope.editUserInterests[index][hob]
      }
    }
   $scope.userInterests[index].userIsActive = false
    userInterestDb($scope.userInterests)
  }



  $scope.onTabUpdate = function (tabInfo, index) {
    for (var tab in tabInfo) {
      if (tabInfo[tab] == "") {
        tabInfo[tab] = $scope.editTabs[index][tab]
      }
       $scope.userInterests[index].userTabName=tabInfo['tabName'];
    }
    userInterestDb($scope.userInterests)
    $scope.tabs[index].tabActive = false
    userTabDbUpdate($scope.tabs)
  }

  $scope.selectedImage = function (file, newFile) {
    $scope.isProfile=false
    var fileData = ""
    if (file.name === newFile[0].name) {
      fileData = file
    } else {
      fileData = newFile[0]
    }
    if (!file && !newFile) {
      return fetchStorageImage('profile.png')
    }

    imageStoreInStorage(fileData, fileData.name)
    AddImageToDb(fileData.name);
    
    
    // var reader = new FileReader();

    // reader.readAsDataURL(fileData)
    //  setTimeout(() => {
    //   $scope.$apply(function () {
    //     $scope.image = reader.result
    //    $scope.currentImage=angular.copy(fileData.name)
    //      console.log($scope.image)
    //      imageStoreInDb(file,fileData.name)
    //   })

    // }, 2000);

  }

  var apiEndPoint = {
    userInfoPoint: ResumeService.ApiEndPoint.userInfoApiEndPoint,
    contactInfoPoint: ResumeService.ApiEndPoint.contactInfoApiEndPoint,
    educationInfoPoint: ResumeService.ApiEndPoint.educationDetailsApiEndPoint,
    experienceInfoPoint: ResumeService.ApiEndPoint.userExperienceDetailsApiEndPoint,
    userInterestPoint: ResumeService.ApiEndPoint.userInterestsApiEndPoint,
    professionalSkillPoint: ResumeService.ApiEndPoint.professionalSkillApiEndPoint,
    personalSkillPoint: ResumeService.ApiEndPoint.personalSkillApiEndPoint,
    softwareSkillPoint: ResumeService.ApiEndPoint.softwareSkillApiEndPoint,
    userTabPoint: ResumeService.ApiEndPoint.userTabApiEndPoint,
    profileImage: ResumeService.ApiEndPoint.imageApiEndPoint
  };





  init()

  function init() {
    $scope.inlineEdit = false;
    $scope.contactEdit = false;
    $scope.introText = false;
    $scope.isSkillEdit = false;
    $scope.isPersonalSkill = false;
    $scope.isSoftwareSkill = false;
  }

  document.addEventListener('readystatechange',function(){
  if(document.readyState =="complete"){
    $timeout(function () {
      preloader()
      document.body.style.backgroundColor = "#fff"
    }, 2000)
  }
})


  function preloader() {
    $scope.isLoad = false
    $scope.isNone = true
  }

 




  function pdfCompelte() {
    $scope.$apply(function () {
      $scope.isPrintDiv = true
    })
  }


  getUserDetail()

  function getUserDetail() {
    ResumeService.getResumeList().then(data => {
      $scope.$apply(function () {
        $scope.resumeInfo.userInfo = data
        $scope.editUserName = angular.copy($scope.resumeInfo)
      })
    })
  }

  getContactList()

  function getContactList() {
    ResumeService.getContactList().then(data => {
      $scope.$apply(function () {
        $scope.contactInfo = data.contactInfo
        $scope.editContactName = angular.copy($scope.contactInfo);
      })
    })
  }
  fetchEducationList()

  function fetchEducationList() {
    ResumeService.getEducationList().then(data => {
      $scope.$apply(function () {
        $scope.educationDetails = data.educationInfo
        $scope.editEducationDetails = angular.copy($scope.educationDetails);
      })
    })
  }


  fetchExperienceList()

  function fetchExperienceList() {
    ResumeService.getExperienceList().then(data => {
      $scope.$apply(function () {
        $scope.userExperienceDetails = data.experienceInfo
       $scope.editExperienceDetails = angular.copy($scope.userExperienceDetails)
      })
    })
  }

  fetchInterestList()

  function fetchInterestList() {
    ResumeService.getInterestList().then(data => {
      $scope.$apply(function () {
        $scope.userInterests = data.interestInfo
        $scope.editUserInterests = angular.copy($scope.userInterests);
      })
    })
  }

  fetchProfessionalList()

  function fetchProfessionalList() {
    ResumeService.getProfessionalList().then(data => {
      $scope.$apply(function () {
        $scope.professionalSkills = data.professionalInfo
        $scope.editSkillDetails = angular.copy($scope.professionalSkills);
      })
    })
  }

  fetchpersonalSkillList()

  function fetchpersonalSkillList() {
    ResumeService.getpersonalSkill().then(data => {
      $scope.$apply(function () {
        $scope.personalSkills = data.personalInfo
        $scope.editPersonalSkills = angular.copy($scope.personalSkills);
      })
    })
  }

  fetchSoftwareList()

  function fetchSoftwareList() {
    ResumeService.getsoftwareSkillList().then(data => {
      $scope.$apply(function () {
        $scope.softwareSkills = data.softwareInfo
        $scope.editSoftwareSkills = angular.copy($scope.softwareSkills);
      })
    })
  }

  fetchUserTabs()

  function fetchUserTabs() {
    ResumeService.getuserTabList().then(data => {
      $scope.$apply(function () {
        $scope.tabs = data.tabInfo
        $scope.editTabs = angular.copy($scope.tabs);
      })
    })
  }

  fetchUserProfilePic()

  function fetchUserProfilePic() {
    ResumeService.getprofileImage().then(data => {
      fetchStorageImage(data.imageName)
    });
  }

  function fetchStorageImage(data) {
    var storageRef = app.storage().ref();
    var nn = storageRef.child('image/' + data);
    nn.getDownloadURL().then(function (downloadURL) {
      $scope.$apply(function () {
        $scope.isProfile=true
        $scope.image = downloadURL
        $scope.editImage = angular.copy($scope.image)
       
      })
    })
  }


  $scope.eduTitleFirstStr = function (title) {
    if(!title) return
    return title.charAt(0)
  }

  $scope.expTitleFirstStr = function (postName) {
    if(!postName) return
    return postName.charAt(0)
  }


  function userInfoDbUpate(userBio) {
    apiEndPoint.userInfoPoint.update(userBio)

  }



  function contactInfoDbUpdate(contactList) {
    var contactInfoDbObj = {
      contactInfo: null
    };
    contactInfoDbObj.contactInfo = contactList
    apiEndPoint.contactInfoPoint.update(contactInfoDbObj)
  }





  function userIntroDbUpate(userBio) {
    apiEndPoint.userInfoPoint.update(userBio)
  }



  function userEduDbUpdate(eduInfo) {
    var eduInfoDb = {
      educationInfo:null
    };
    eduInfoDb.educationInfo=eduInfo
    apiEndPoint.educationInfoPoint.update(eduInfoDb)
  }



  function userProfessSkillDbUpdate(skillInfo) {
    var profSkilDb = {};
    profSkilDb['professionalInfo'] = skillInfo;
    apiEndPoint.professionalSkillPoint.update(profSkilDb)
  }




  function userPersonalSkillDbUpdate(personalInfo) {
    var persInfoDb = {};
    persInfoDb['personalInfo'] = personalInfo
    apiEndPoint.personalSkillPoint.update(persInfoDb)
  }


  function userSoftwareSkillDbUpdate(softwareInfo) {
    var sofInfoDb = {};
    sofInfoDb['softwareInfo'] = softwareInfo;
    apiEndPoint.softwareSkillPoint.update(sofInfoDb)
  }


  function userExpDbUpdate(expInfo) {
    var expDb = {};
    expDb['experienceInfo'] = expInfo;
    apiEndPoint.experienceInfoPoint.update(expDb)
  }



  function userInterestDb(hobbieInfo) {
    var interestDb = {};
    interestDb['interestInfo'] = hobbieInfo;
    apiEndPoint.userInterestPoint.update(interestDb)
  }

  function userTabDbUpdate(tabInfo) {
    var tabDbObj = {};
    tabDbObj['tabInfo'] = tabInfo;
    apiEndPoint.userTabPoint.update(tabDbObj);
  }

  function AddImageToDb(imageName) {
    var profileImage = {};
    profileImage['imageName'] = imageName
    apiEndPoint.profileImage.update(profileImage)
  }


  function imageStoreInStorage(image, name) {
    var uploadToDb = app.storage().ref('image/' + name).put(image);
    uploadToDb.on('state_changed', (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress == 100) {
        fetchStorageImage(name)
      }
    })
  }


  window.onscroll = function () {
    scrollFunction()
  }

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scroll-top").style.display = "block";
    } else {
      document.getElementById("scroll-top").style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  $scope.topFunction = function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


  function myFunction(x) {
    x.classList.toggle("change");
  }

})