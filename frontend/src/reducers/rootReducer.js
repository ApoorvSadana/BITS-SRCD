import { produce, original } from "immer";
import { act } from "react-dom/test-utils";

const initState = {
    userName: '',
    admin: false,
    userEmail: false,
    profilePic: '',
    uploaderOpen: false,
    invoicesProcessed: 0,
    userID: '0fcc0cae-1870-4307-b949-7ed90788b878',
    files: [
        {
            sno: 1,
            title: 'XYZ',
            status: '✅Processed',
            date: new Date().toLocaleDateString()
        },
        {
            sno: 2,
            title: 'ABC',
            status: 'Waiting',
            date: new Date().toLocaleDateString()
        },
        {
            sno: 3,
            title: 'ABC',
            status: 'Waiting',
            date: new Date().toLocaleDateString()
        },
        {
            sno: 4,
            title: 'ABC',
            status: 'Waiting',
            date: new Date().toLocaleDateString()
        },
        {
            sno: 5,
            title: 'ABC',
            status: 'Waiting',
            date: new Date().toLocaleDateString()
        },
    ],
    preview: {
        url: null,
        show: false
    },
    support: [],
    supportDisplay: {
        display: false,
        url: null
    },
    formDetails: {
        fullName: '',
        email: '',
        phoneNumber: '',
        paperTitle: '',
        filePipeline: {
            proposal: [],
            commentsOne: [],
            commentsTwo: [],
            edorsements: []
        },
        paperAuthors: '',
        designation: '',
        department: '',
        institute: '',
        lastDate: new Date(),
        reviewerOneName: '',
        reviewerTwoName: ''
    },
    uploadedFiles: [
    ],
    fundingCall: {
        options: [
            "Department of Science and Technology-DST",
            "Science and Engineering Research Board (SERB)-Extramural Research (EMR) funding scheme",
            "Department of Biotechnology",
            "Biotechnology Industry Research Assistance Council (BIRAC)",
            "Board of Research in Nuclear Science(BRNS) - Research Grants",
            "Indian Space and Research Organization (ISRO)-RESPOND",
            "Indian Council of Social Science Research (ICSSR)-Ministry of Education",
            "Indian Council of Medical Research (ICMR)",
            "National Council of Education Research & Training (NCERT)-ERIC",
            "Council of Scientific and Industrial Research (CSIR)",
            "Defence Research and Development Organization (DRDO) –Extramural Research Grant",
            "Shastri Institutional Collaborative Research Grant (SICRG)",
            "Department of Science and Technology-DST-Rajasthan",
            "Ministry of Education- IMPacting Research INnovation and Technology (IMPRINT – INDIA)",
            "Other (specify)"
        ],
        selected: "",
        others: ""
    },
    coInvestigators: [{
        name: '',
        designation: '',
        department: '',
        institute: ''
    }],
    infoTexts: {
        dashboard: {
            heading: 'Welcome to your Dashboard',
            text: 'This is your SRCD Project Proposal Submission Dashboard. All Project Proposal submissions which you make from the ‘New Submission’ page will be reflected here. You can come back here any time to see the status of your submissions.'
        },
        form: {
            heading: 'Project Submission',
            text: 'You can use this page to submit a new project to the SRCD. The form has three sections. Basic Details, More Details and Uploads. Navigate through the sections via the blue sidebar or by using the next button. After filling all the fields, click on submit on the Uploads Page.'
        }
    },
    experiencedFaculty: false
}

var files;
var newFiles;
var currCo;
var currArr;

const rootReducer = produce((draft, action) => {
    switch (action.type) {
        case "LOGIN":
            draft.userEmail = action.email;
            draft.userName = action.name;
            let arr2 = original(draft).uploadedFiles;
            draft.profilePic = action.image;
            draft.admin = action.admin;
            let counter = arr2.length;
            draft.uploadedFiles = action.projects.map((project) => {
                counter = counter + 1;
                let lastDate = '-';
                if (project.lastDate) {
                    lastDate = new Date(project.lastDate).toLocaleDateString()
                }
                let commentsOne = 'http://172.24.16.87.xip.io:3100/sub/' + project._id + '/1';
                let commentsTwo = 'http://172.24.16.87.xip.io:3100/sub/' + project._id + '/2';
                if (project.experiencedFaculty) {
                    commentsOne = '-';
                    commentsTwo = '-';
                }
                return {
                    sno: counter,
                    title: project.title,
                    url: 'http://172.24.16.87.xip.io:3100/sub/' + project._id + '/0',
                    commentsOne: commentsOne,
                    commentsTwo: commentsTwo,
                    endorsments: 'http://172.24.16.87.xip.io:3100/sub/' + project._id + '/3',
                    date: new Date().toLocaleDateString(),
                    lastDate: new Date(project.lastDate).toLocaleDateString(),
                    status: project.status ? '✅Processed' : 'Waiting'
                }
            })
            break;
        case "TOGGLE_UPLOADER":
            draft.uploaderOpen = action.toggle;
            break;
        case "ADD_FILE":
            files = original(draft).files;
            newFiles = [{
                id: action.fileID,
                filename: action.file.meta.name,
                status: false,
                fraud: '-',
                date: new Date().toLocaleDateString(),
                download: null
            }, ...files];
            draft.files = newFiles;
            break;
        case "UPDATE_FILE":
            let fileID = action.fileData.fileID;
            let fraud = action.fileData.fraud;
            let url = action.fileData.link;
            let processedDetails = action.fileData.processedDetails;
            files = original(draft).files;
            files.map((file, index) => {
                if (file.id == fileID) {
                    draft.files[index].fraud = fraud;
                    draft.files[index].download = url;
                    draft.files[index].status = true;
                    draft.files[index].processedDetails = processedDetails;
                }
            });
            draft.invoicesProcessed = original(draft).invoicesProcessed + 1;
            break;
        case "SHOW_PREVIEW":
            draft.preview.show = true;
            draft.preview.url = action.url;
            break;
        case "CLOSE_PREVIEW":
            draft.preview.show = false;
            draft.preview.url = null;
            break;
        case "SET_SUPPORT":
            draft.support = action.supportArray;
            break;
        case "DISPLAY_INVOICE":
            draft.support = action.supportArray;
            break;
        case "DISPLAY_SUPPORT":
            draft.supportDisplay = {
                display: true,
                url: action.url
            }
            break;
        case "HIDE_SUPPORT":
            draft.supportDisplay = {
                display: false,
                url: null
            }
            break;
        case "FORM_DETAILS_CHANGE":
            if ('fullName' in action) {
                draft.formDetails.fullName = action.fullName;
            }
            if ('email' in action) {
                draft.formDetails.email = action.email;
            }
            if ('phoneNumber' in action) {
                draft.formDetails.phoneNumber = action.phoneNumber;
            }
            if ('paperTitle' in action) {
                draft.formDetails.paperTitle = action.paperTitle;
            }
            if ('paperAuthors' in action) {
                draft.formDetails.paperAuthors = action.paperAuthors;
            }
            if ('designation' in action) {
                draft.formDetails.designation = action.designation;
            }
            if ('department' in action) {
                draft.formDetails.department = action.department;
            }
            if ('institute' in action) {
                draft.formDetails.institute = action.institute;
            }
            if ('lastDate' in action) {
                draft.formDetails.lastDate = action.lastDate;
            }
            break;
        case "ADD_FILES":
            let arr = draft.uploadedFiles;
            arr.push({
                sno: arr.length + 1,
                title: original(draft).formDetails.paperTitle,
                status: 'Waiting',
                url: action.url,
                date: new Date().toLocaleDateString(),
                lastDate: new Date().toLocaleDateString(),
                commentsOne: 'Reload',
                commentsTwo: 'Reload',
                url: 'Reload',
                endorsments: 'Reload'
            })
            break;
        case "SELECT_FUNDING_CALL":
            draft.fundingCall.selected = original(draft).fundingCall.options[action.selectedIndex]
            break
        case "CO_INVEST_NAME_CHANGE":
            draft.coInvestigators[action.index].name = action.name
            break
        case "CO_INVEST_AFFLIATION_CHANGE":
            draft.coInvestigators[action.index].affliation = action.affliation
            break
        case "ADD_CO_INVEST":
            currCo = original(draft).coInvestigators.slice();
            currCo.splice(action.index + 1, 0, {
                name: '',
                designation: '',
                department: '',
                institute: ''
            })
            draft.coInvestigators = currCo;
            break
        case "DELETE_CO_INVEST":
            if (currCo.length == 1) {
                draft.coInvestigators = [{
                    name: '',
                    affliation: ''
                }];
            } else {
                currCo = original(draft).coInvestigators.slice();
                currCo.splice(action.index, 1)
                draft.coInvestigators = currCo;
            }
            break
        case "UPLOAD_FILE":
            currArr = original(draft).formDetails.filePipeline[action.fileType].slice()
            currArr.push(action.file)
            draft.formDetails.filePipeline[action.fileType] = currArr
            break;
        case "DELETE_FILE":
            currArr = original(draft).formDetails.filePipeline[action.fileType].slice()
            currArr = currArr.filter((file) => {
                if (file.meta.name != action.file.meta.name) {
                    return true;
                } else {
                    return false;
                }
            })
            draft.formDetails.filePipeline[action.fileType] = currArr
            break;
        case "FUNDING_CALL_OTHERS":
            draft.fundingCall.others = action.others
            break
        case "CO_INVEST_DETAILS_CHANGE":
            if ('name' in action) {
                draft.coInvestigators[action.index].name = action.name
            }
            if ('designation' in action) {
                draft.coInvestigators[action.index].designation = action.designation
            }
            if ('department' in action) {
                draft.coInvestigators[action.index].department = action.department
            }
            if ('institute' in action) {
                draft.coInvestigators[action.index].institute = action.institute
            }
            break;
        case "REVIEWER_NAME_CHANGE":
            if (action.number == 1) {
                draft.formDetails.reviewerOneName = action.name
            } else if (action.number == 2) {
                draft.formDetails.reviewerTwoName = action.name
            }
            break
        case "EXPERIENCED_FACULTY_CHECK":
            draft.experiencedFaculty = !original(draft).experiencedFaculty;
            break
        case "RESET_AFTER_SUBMIT":
            draft.formDetails = {
                fullName: '',
                email: '',
                phoneNumber: '',
                paperTitle: '',
                filePipeline: {
                    proposal: [],
                    commentsOne: [],
                    commentsTwo: [],
                    edorsements: []
                },
                paperAuthors: '',
                designation: '',
                department: '',
                institute: '',
                lastDate: new Date(),
                reviewerOneName: '',
                reviewerTwoName: ''
            }
            draft.fundingCall.selected = "";
            draft.fundingCall.others = "";
            break;
    }
}, initState);


export default rootReducer;