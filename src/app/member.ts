
export class Member {

    constructor(
      public id:string,
      public familyid:string,
      public unitid:string,
      public name:string,
      public dob:string ,
      public gender:string ,
     public phone:string ,
    public mail:string ,
    public baptized_date:string,
           public baptized_parish:string,
           public confirmation_date:string,
           public confirmation_parish:string,
           public father:string,
           public mother:string,
           public marital_status:boolean,
           public spouse_name:string,
           public marriage_date:string,
           public marriage_parish:string,
           public  education_status:string,
           public  qualification:string,
           public workplace:string,
           public  job:string,
           public  parish_association:[],
           public photo_url:string,
    ) {  }
  
  }