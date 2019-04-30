const express = require('express');

const router = express.Router();

router.post('/bmi',(req,res,next)=>{
    const BMIdata = req.body;
    
    if(!BMIdata.weight_unit || typeof BMIdata.weight_unit != 'string'){
        res.status(200).json({
            message: "Please provide weight unit"
        }) 
    }if(!BMIdata.height_unit || typeof BMIdata.height_unit != 'string'){
        console.log(!BMIdata.height_unit || BMIdata.height_unit != 'string');
            res.status(200).json({
                message: "Please provide height unit"
            }) 
    }if(!BMIdata.weight || typeof BMIdata.weight != 'number' || isNaN(BMIdata.weight)){
        res.status(200).json({
            message: "Please provide appropriate weight"
        }) 
    }if(!BMIdata.height || typeof BMIdata.height != 'number' || isNaN(BMIdata.height)){
        res.status(200).json({
            message: "Please provide appropriate height"
        })
        }
        

    const weightInKilogram = convertWeightInKilogram(BMIdata.weight, BMIdata.weight_unit);
    const heightInMeter = convertHeightInMeter(BMIdata.height, BMIdata.height_unit);

    
    function convertWeightInKilogram(weight,unit){
        if(unit == 'kilogram' || unit == 'kg'){
            return weight
        }else if(unit == 'pound' || uni == 'lb'){
            return weight/2.20462;
        }else if(unit == 'gram' || unit == 'g'){
            return gram/1000;
        }
        }
        
        function convertHeightInMeter(height, unit){
        if(unit == 'meter' || unit == 'm'){
            return height
        }else if(unit == 'inches' || unit == 'inch'){
           return height/39.3701;
        }else if(unit == 'centimeter' || unit == 'cm'){
            return height/100; 
        }else if(unit == 'feet' || unit == 'ft'){
            return height/3.28084;
            }    
        }
    var BMI = Math.round(weightInKilogram/(heightInMeter*heightInMeter) * 100) / 100;
    var category = null;
    if(BMI <= 18.5){
        category = 'Under Weight' 
    }else if(BMI > 18.5 && BMI <= 24.9){
        category = 'Normal Weight'
    }else if(BMI >= 25 && BMI <= 29.9){
        category = 'Over Weight'
    }else if(BMI >= 30){
        category = 'Obesity'
    }

    res.status(200).json({
        data:{
            BMI:BMI,
            category:category,
            categories:{
                'Under Weight': 'BMI < 18.5',
                'Normal Weight': '18.5 > BMI => 24.9',
                'Over Weight': '25 > BMI => 29.9',
                'Obesity':'BMI >= 30',
            }
        }    
    });

});


router.get('/BMIType/:BMI',(req,res)=>{
const BMI = req.params.BMI
if(!BMI || isNaN(BMI)){
res.status(200).json({
 message:'Please provide appropriate BMI value'   
});
}

if(BMI <= 18.5){
    category = 'Under Weight' 
}else if(BMI > 18.5 && BMI <= 24.9){
    category = 'Normal Weight'
}else if(BMI >= 25 && BMI <= 29.9){
    category = 'Over Weight'
}else if(BMI >= 30){
    category = 'Obesity'
}
res.status(200).json({
    data:{
        BMI:BMI,
        category:category,
        categories:{
            'Under Weight': 'BMI < 18.5',
            'Normal Weight': '18.5 > BMI => 24.9',
            'Over Weight': '25 > BMI => 29.9',
            'Obesity':'BMI >= 30',
        }
    }  
});
});

module.exports = router;