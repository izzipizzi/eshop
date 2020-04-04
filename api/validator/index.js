// const { check, validationResult} = require('express-validator')

exports.userSignUpValidator=(req,res,next)=>{
    req.check('name','Імя повинно бути вказане').notEmpty();
    req.check('email',' email має бути довжиною до 32 символів')
    .matches(/.+@.+\..+/)
    .withMessage('Введіть будьласка правильну пошту')
    .isLength({
        min : 4,
        max : 32 
    });
    req.check('password','Пароль потрібно ввести').notEmpty()
    req.check('password')
    .isLength({
        min : 6,
        max : 32
    })
    .withMessage('Пароль повинний бути довжиною як мінімум 6 символів')
    .matches(/\d/)
    .withMessage('Пароль має містити як мінімум 1 цифру');

    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next();
}