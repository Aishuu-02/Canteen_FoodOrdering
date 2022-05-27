const express= require('express')
const router = express.Router();
const { isLoggedIn } = require('../views/partials/middleware');
const User = require('../models/users');
const Item = require('../models/item');


router.get('/',async(req,res)=>{
    res.render('admin/home');
  })
router.get('/about',async(req,res)=>{
    res.render('admin/about');
  })
router.get('/contact',async(req,res)=>{
    res.render('admin/contact');
  })
router.get('/additem',isLoggedIn, async(req,res)=>{
    const username = req.session.currentuser;
    const user = await User.findOne({username})
    console.log(user);
      res.render('admin/food_item',{user,username});
    })
router.get('/home',async(req,res)=>{
    const username = req.session.currentuser;
    const items = await Item.find({});
    const user = await User.findOne({username})
    console.log(user);
      res.render('admin/food_home',{items,user,username});
    })
router.post('/home',async(req,res)=>{
      const item= new Item(req.body.item);
      await item.save();
      res.redirect(`/home/home/${item._id}`)
    })
router.get('/home/:id',async(req,res)=>{
      const username = req.session.currentuser;
      const item = await Item.findById(req.params.id);
      const user = await User.findOne({username})  
      res.render('admin/food_show',{ item,user,username});
      })

router.get('/home/:id/edit',async(req,res)=>{
      const username = req.session.currentuser;
      const user = await User.findOne({username})
        const item = await Item.findById(req.params.id)
        res.render('admin/food_edit',{item, username,user});
      })
router.put('/home/:id',isLoggedIn,async(req,res)=>{
        const { id } = req.params;
        const item = await Item.findByIdAndUpdate(id,{...req.body.item})
        res.redirect(`/home/home/${item._id}`)
      })
router.delete('/home/:id',isLoggedIn,async(req,res)=>{
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.redirect('/home/home');
      })

  module.exports = router;