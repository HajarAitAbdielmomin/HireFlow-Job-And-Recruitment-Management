import {getter, req} from 'services/axios_helper';
import { request } from 'services/axios_helper';

const endPoint1 = 'recruiter/job/'
const endPoint2= 'recruiter/interviews/'
const endPoint3 = 'recruiter/interviewsResults/'
//recruiter/interviewsResults/checkByApplication/{idApplication}
class recruiterServices {

    async checkExistence(idApplication){
        try {
            const response = await getter(
                'GET',
                endPoint3+'checkByApplication/'+idApplication
            )
            if(response.data){
                return response.data
            }
        }catch (e) {
            console.error('An error occured (checkExistence): ', e)
        }
    }

    async updateResult(idIr,updatedData){
        try {
            const response = await request(
                'PUT',
                endPoint3+'update/'+idIr,
                 updatedData
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (updateResult): ', e)
        }
    }
    async getResultByInterview(idI){
        try {
            const response = await getter(
                'GET',
                endPoint3+idI,
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (addResult): ', e)
        }
    }

    async addResult(idI, res){
        try {
            const response = await request(
                'POST',
                endPoint3+idI,
                res
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (addResult): ', e)
        }
    }
    async getInterviewById(idI){
        try {
            const response = await getter(
                'GET',
                'applicant/interviews/interview/'+idI
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (getInterviewById): ', e)
        }
    }
    async getInterviewsByJob(idJ){
        try {
            const response = await getter(
                'GET',
                endPoint2+idJ
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (getInterviewsByRec): ', e)
        }
    }

    async updateInterview(idI,data){
     try {
         const response = await request(
             'PUT',
             endPoint2+'updateInterview/'+idI,
             data
         )
         if(response.data){
             //console.log(response.data)
             return response.data
         }
     }catch (e) {
         console.error('An error occured (updateInterview): ', e)
     }
    }
    async getInterview(idJ,idA){
        try {
            const response = await getter(
                'GET',
                endPoint2+'interview/'+idJ+'/'+idA
            )
            if(response.data){
               // console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (getInterview): ', e)
        }
    }

    async check(idJ,idA){
        try {
            const response = await getter(
                'GET',
                endPoint2+'check/'+idJ+'/'+idA
            )
            if(response){
                //console.log(response)
                return response
            }
        }catch (e) {
            console.error('An error occured (check): ', e)
        }
    }
    async scheduleInterview(idJ, idA, scheduledInterview){
        try {
            const response = await request(
                'POST',
                endPoint2+'addInterview/'+idJ+'/'+idA,
                scheduledInterview
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (scheduleInterview): ', e)
        }
    }
    async getApplicantsForEachJob(idJ){
        try {
            const response = await getter(
                'GET',
                endPoint1+'applicants/'+idJ
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }
        }catch (e) {
            console.error('An error occured (getApplicantsForEachJob): ', e)
        }
    }

    async updateJob(idJ, data){
        try {
            const response = await request(
                'PUT',
                endPoint1+'update/'+idJ,
                data
            )
            if(response.data){
                console.log(response.data)
                return true
            }
        }catch (e) {
            console.error('An error occured (updateJob): ', e)
        }
    }
    async getJobs(idR){
        try {
            const response = await getter(
                'GET',
                endPoint1+'jobs/'+idR
            )
            if(response.data){
                //console.log(response.data)
                return response.data
            }

        }catch (e) {
            console.error('An error occured (getJobs): ', e)
        }
    }
    async postJob(idR, job){
        try {
            const response = await request(
                'POST',
                endPoint1+'addJob/'+idR,
                job
            )
            if(response.data){
                //console.log(response.data)
                return true
            }
        }catch (e) {
            console.error('An error occured (postJob): ', e)
        }
    }
}
export default new recruiterServices();