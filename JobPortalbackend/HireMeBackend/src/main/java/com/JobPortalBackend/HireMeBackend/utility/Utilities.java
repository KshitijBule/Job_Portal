package com.JobPortalBackend.HireMeBackend.utility;

import com.JobPortalBackend.HireMeBackend.entity.Sequence;
import com.JobPortalBackend.HireMeBackend.exception.JobPortalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component
public class Utilities {

    private static MongoOperations mongoOperations;
    // autowire static pe work nhi karta to yaha setter injection krna padega

    @Autowired
    public void setMongoOperations(MongoOperations mongoOperations){
        Utilities.mongoOperations = mongoOperations;
    }


    // auto increment kar rhe hai joki mongoDB me nhi hota sql me auto increment hota hai
    // aur saath hi saath uske complex objectid('699c5e3dd5a8c98485a6e96c') ko long me convert kar rhe hai like 1,2,3,4 etc
    public static Long getNextSequence(String key) throws JobPortalException{
        Query query = new Query(Criteria.where("_id").is(key));
        Update update = new Update();
        update.inc("seq",1);
        FindAndModifyOptions options = new FindAndModifyOptions();
        options.returnNew(true);
        Sequence seq = mongoOperations.findAndModify(query,update,options,Sequence.class);
        if(seq==null) throw new JobPortalException("Unable to get seq_id for key: " +key);
        return seq.getSeq();
    }
}
