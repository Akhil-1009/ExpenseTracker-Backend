import Transaction from '../models/Transaction.js';
import moment from 'moment';

export const add= async (req,res) =>{
    try{  
       
        const {amount,type,category,date,reference,description,userid} = req.body;
        
        if(!amount|| !type || !category||!date||!reference||!reference||!description){
           
            return res.json({
                
                error: "Please enter All Fields",
            }) }
        const newtransaction= new Transaction(req.body);
        await newtransaction.save();
        return res.status(200).json({
            success: true,
            message: "transaction Added",
             
        });
    }
    catch(err){
        console.log("kuch error hai");
        return res.json({
             error:"something went wrong"
        });
    }

}

export const editTransaction= async (req,res) =>{
    try{  
        
        const {amount,type,category,date,reference,description,userid} = req.body.payload;
         
        if(!amount|| !type || !category||!date||!reference||!reference||!description){
             
            return res.json({
                
                error: "Please enter All Fields",
            }) }
            await Transaction.findOneAndUpdate({_id : req.body.transactionId} , req.body.payload)
        return res.status(200).json({
            success: true,
            message: "transaction Updated Successfully",
             
        });
    }
    catch(err){
        console.log("kuch error hai");
        return res.json({
             error:"something went wrong"
        });
    }

}


export const deleteTransaction= async (req,res) =>{
    try{  
        await Transaction.findOneAndDelete({_id : req.body.transactionId})
    res.send("Transaction Updated Successfully");
    }
    catch(err){
         
        return res.json({
             error:"something went wrong"
        });
    }

}

export const getall= async (req,res) =>{
    const { frequency, selectedRange,type } = req.body;
    try{  
        const transactions=await Transaction.find({userid:req.body.userid});
        console.log(transactions);
        if(!transactions)
        {
            return res.json({
                error:"your session expired login again"
            });
        }
        else{
           const  newtransactions = await Transaction.find({
                ...(frequency !== "custom"
                  ? {
                      date: {
                        $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
                      },
                    }
                  : {
                      date: {
                        $gte: selectedRange[0],
                        $lte: selectedRange[1],
                      },
                    }),
                userid: req.body.userid,
                ...(type!=='all' && {type})
            })
        res.send(newtransactions);

        }
        // res.send(transactions);

    }
    catch(err){
        console.log(err);
        return res.json({
            
             error:"something went wrong"
        });
    }

}