import {getter, req} from 'services/axios_helper';
import { request } from 'services/axios_helper';

const endPoint1 = 'applicant/education/'
const endPoint2 = 'applicant/project/'
const endPoint3 = 'applicant/skills/'
const endPoint4 = 'applicant/jobs/'
const endPoint5 = 'applicant/application/'
const endPoint6 = 'applicant/interviews/'
//

class applicantServices {

    async updateStatus(idUser,status){
        try {
            const response = await request(
                'PUT',
                'applicant/updateStatus/'+idUser,
                status
            )
            if(response.data){
                console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (updateStatus): ', e)
        }
    }
    async getResultInterview(idI){
        try {
            const response = await getter(
                'GET',
                'recruiter/interviewsResults/'+idI
            )
            if(response.data){
                console.log(response.data)
                return response.data
            }
        }   catch (e) {
            console.error('An error occured (getResultInterview): ', e)

        }
    }

    async checkInterviewByApplication(idApplication){
     try {
         const response = await getter(
             'GET',
             'recruiter/interviewsResults/checkByApplication/'+idApplication
         )
         if(response.data){
             console.log(response.data)
             return response.data
         }
     }   catch (e) {
         console.error('An error occured (checkInterviewByApplication): ', e)

     }
    }
    async checkInterview(idI){
        try {
            const response = await getter(
                'GET',
                'recruiter/interviewsResults/check/'+idI
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (checkInterview): ', e)
        }
    }

    async getInterview(idI){
        try {
            const response = await getter(
                'GET',
                endPoint6+'interview/'+idI
            )
            if(response.data){
               // console.log(response.data)
                return response.data
            }

        }catch (e) {
            console.error('An error occured (getInterview): ', e)
        }
    }
    async setAttendence(idI,data){
        try {
            const response = await request(
                'PUT',
                endPoint6+'attendance/'+idI,
                data
            )
            if(response.data){
               console.log(response.data)
                return response.data
            }

        }catch (e) {
            console.error('An error occured (setAttendence): ', e)
        }
    }
    async getInterviews(idApplicant){
        try {
            const response = await getter(
                'GET',
                endPoint6+idApplicant
            )
            if(response){
                //console.log(response.data)
                return response.data
            }

        }catch (e) {
            console.error('An error occured (getInterviews): ', e)
        }
    }
    async applicationDetails(idA){
        try {
            const response = await getter(
                'GET',
                endPoint5+'details/'+idA
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }

        }catch (e) {
            console.error('An error occured (applicationDetails): ', e)
        }
    }

    async cancelApp(idApplication){
        try {
            const response = await getter(
                'DELETE',
                endPoint5+'remove/'+idApplication
            )
            if(response.data){
               // console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (cancelApp): ', e)
        }
    }

    async appliedJobs(idA){
        try {
            const response = await getter(
                'GET',
                endPoint5+'jobIds/'+idA
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (appliedJobs): ', e)
        }
    }

    async apply(idJ,idA,application){
        try {
            const response = await request(
                'POST',
                endPoint5+idJ+'/'+idA,
                application
            )
            if(response.data){
                //console.log(response.data)
                return true
            }
        }catch (e) {
            console.error('An error occured (apply): ', e)
        }
    }

    async getJobDetails(){
        try {
            const response = await getter(
                'GET',
                endPoint4+'details'
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (getJobDetails): ', e)
        }
    }

    async addSkill(idA,idS){

        try {
            const response = await request(
                'POST',
                endPoint3+'addSkill/'+idA+'/'+idS,
                null
            )
            if(response){
                //console.log(response)
                return true
            }
        }catch (e) {
            console.error('An error occured (addSkill): ', e)
        }
    }

    async addNewSkill(idA,skill){

        try {
            const response = await request(
                'POST',
                endPoint3+'addSkill/'+idA,
                skill
            )
            if(response.data){
                console.log(response.data)
                return true
            }
        }catch (e) {
            console.error('An error occured (addNewSkill): ', e)
        }
    }
    async removeSkill(idS,idA){

        try {
            const response = await getter(
                'DELETE',
                endPoint3+'remove/'+idS+'/'+idA
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (removeSkill): ', e)
        }
    }

    async getSkill(id){
        try {
            const response = await getter(
                'GET',
                endPoint3+id
            )
            if(response.data){
                console.log(response.data)
               return response.data
            }
        }catch (e) {
            console.error('An error occured (getSkill): ', e)
        }
    }
async getSkillsNamesByApplicant(idA){
    try {
        const response = await getter(
            'GET',
            'applicant/skillsNames/'+idA
        )
        if(response.data){
            //console.log(response.data)
            return response.data
        }
    }catch (e) {
        console.error('An error occured (getSkillsByApplicant): ', e)
    }
}

    //skills
    async getSkillsByApplicant(id){
        try {
            const response = await getter(
                'GET',
                endPoint3+'all/'+id
            )
            if(response.data){
                console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (getSkillsByApplicant): ', e)
        }
    }
    async getSkills(){
        try {
            const response = await getter(
                'GET',
                endPoint3+'all'
            )
            if(response){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (getSkills): ', e)
        }
    }

    async updateProject(id,updatedProject){
        try {
            const res = await request(
                'PUT',
                endPoint2+'updateProject/'+id,
                updatedProject
            )
            if(res.data){
                return res.data
            }
        }catch (e) {
            console.error('An error occured (updateProject): ', e)
        }
    }

    async getProject(id){
        try {
            const res = await getter(
                'GET',
                endPoint2+id
            )
            if(res.data){
                //console.log(res.data)
                return res.data
            }
        }catch (e) {
            console.error('An error occured (getProject): ', e)
        }

    }
    async removeProject(id){
        try {
            const res = await getter(
                'DELETE',
                endPoint2+'remove/'+id
            );
            if(res.data){
                return res.data
            }
        }catch (e) {
            console.error('An error occured (removeProject): ', e)
        }
    }
    //projects
    async getProjects(idApplicant){
        try {
            const res = await getter(
                'GET',
                endPoint2+'all/'+idApplicant
            );

            if(res.data){
               // console.log(res.data)
                return res.data
            }

        }catch (e) {
            console.error('An error occured (getProjects): ', e)
        }
    }

    async addProject(idApplicant,data){
        try {
            const result = await request(
                'POST',
                endPoint2+'addProject/'+idApplicant,
                data
            )
            if(result.data){
                //console.log(result.data)
                return true
            }

        }catch (e) {
            console.error('An error occured (Project): ', e)
        }
    }



    async updateEducation(id,updatedEducation){
        try {
            const res = await request(
                'PUT',
                endPoint1+'updateEducation/'+id,
                updatedEducation
            )
            if(res.data){
                return res.data
            }
        }catch (e) {
            console.error('An error occured (updateEducation): ', e)
        }
    }

    async getEducation(id){
        try {
            const res = await getter(
                'GET',
                endPoint1+id
            )
            if(res.data){
                //console.log(res.data)
                return res.data
            }
        }catch (e) {
            console.error('An error occured (getEducation): ', e)
        }

    }
    async removeEducation(id){
        try {
            const res = await getter(
                'DELETE',
                endPoint1+'remove/'+id
            );
            if(res.data){
                return res.data
            }
        }catch (e) {
            console.error('An error occured (removeEducation): ', e)
        }
    }
    //educations

    async getEducations(idApplicant){
        try {
            const res = await getter(
                'GET',
                endPoint1+'all/'+idApplicant
            );

            if(res.data){
               // console.log(res.data)
                return res.data
            }

        }catch (e) {
            console.error('An error occured (getEducations): ', e)
        }
    }

    async addEducation(idApplicant,data){
        try {
            const result = await request(
                'POST',
                endPoint1+'addEducation/'+idApplicant,
                data
            )
            if(result.data){
                //console.log(result.data)
                return true
            }

        }catch (e) {
            console.error('An error occured (addEducation): ', e)
        }
    }

}

export default new applicantServices();