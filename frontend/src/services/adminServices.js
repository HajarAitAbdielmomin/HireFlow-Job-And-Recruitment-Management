import { getter } from 'services/axios_helper';

const endPoint1 = 'admin/dashboard/';
const endPoint2 = 'admin/'
class adminServices {

    //endPoint2
    async getAllApplicants(){
        try{
            const recs = await getter(
                'GET',
                endPoint2+'app/allApp'
            );

            if(recs.data){
                //console.log(JSON.stringify(recs.data));
                return recs.data
            }

        }catch (e){
            console.error('An error occured (users): ', e)
        }
    }
    async getUserById(UserId){
        try{
            const res = await getter(
                'GET',
                endPoint2+'user/'+UserId
            );

            if(res.data){
                console.log(res.data);
                return res.data
            }

        }catch (e){
            //console.error('An error occured (remove): ', e)
        }
    }
    async removeUser(UserId){
        try{
            const res = await getter(
                'DELETE',
                endPoint2+'remove/'+UserId
            );

            if(res.data){
                //console.log(JSON.stringify(res.data));
                return res.data
            }

        }catch (e){
            console.error('An error occured (remove): ', e)
        }

    }
    async getAllRecruiters(){
        try{
            const recs = await getter(
                'GET',
                endPoint2+'rec/allRec'
            );

            if(recs.data){
                //console.log(JSON.stringify(recs.data));
                return recs.data
            }

        }catch (e){
            console.error('An error occured (rec): ', e)
        }
    }

    //endPoind1
    async gendersStatisticsApp(){
        try{
            const arrays = await getter(
                'GET',
                endPoint1+'gendersStatisticsApp'
            );

            if(arrays.data){
                //console.log(JSON.stringify(arrays.data));
                return arrays.data
            }

        }catch (e){
            console.error('An error occured (gendersStatisticsApp): ', e)
        }
    }
    async gendersStatisticsRec(){
        try{
            const arrays = await getter(
                'GET',
                endPoint1+'gendersStatisticsRec'
            );

            if(arrays.data){
                //console.log(JSON.stringify(arrays.data));
                return arrays.data
            }

        }catch (e){
            console.error('An error occured (gendersStatisticsRec): ', e)
        }
    }
    async countAll(){
        try{
            const num = await getter(
                'GET',
                endPoint1+'countAll'
            );

            if(num.data){
                //console.log(JSON.stringify(num.data));
                return num.data
            }

        }catch (e){
            console.error('An error occured (countAll): ', e)
        }
    }
    async countApp(){
        try{
            const num = await getter(
                'GET',
                endPoint1+'countApplicants'
            );

            if(num.data){
                //console.log(JSON.stringify(num.data));
                return num.data
            }

        }catch (e){
            console.error('An error occured (countApp): ', e)
        }
    }
    async countRec(){
        try{
            const num = await getter(
                'GET',
                endPoint1+'countRecruiters'
            );

            if(num.data){
                //console.log(JSON.stringify(num.data));
                return num.data
            }

        }catch (e){
            console.error('An error occured (countRec): ', e)
        }
    }
    async users(){
        try{
            const userss = await getter(
                'GET',
                endPoint1+'users'
            );

            if(userss.data){
                console.log(JSON.stringify(userss.data));
                return userss.data
            }

        }catch (e){
            console.error('An error occured (users): ', e)
        }
    }

   async domination(){
     try{
       const res = await getter(
           'GET',
           endPoint1+'domination',
       );

       if(res.data){
           //console.log(res.data);
           return res.data;
       }

     } catch (e) {
         console.error('An error occured (getter) :', e)
     }
   }
}

export default new adminServices();

