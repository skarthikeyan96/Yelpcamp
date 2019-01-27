const express = require('express');
const router  = express.Router({ mergeParams: true })
const campground = require('../models/campgrounds')
const Comment = require('../models/comments')
const middleware = require('../middleware')

router.post("/", (req, res) => {
    //console.log("params ",req.params.id)
    campground.findById(req.params.id, (err, found) => {
        if (!err) {
            console.log(found)
            let text = req.body.comment;
            let author = {
                id: req.user._id,
                username: req.user.username,
            }
            let comment = {
                text,
                author
            }
            Comment.create(comment, (err, created) => {
                if (!err) {
                    // able to create the comment
                    console.log("Added a new comment")
                    console.log(created)
                    found.comments.push(created)
                    found.save();
                    req.flash("success", "Successfully added a comment")
                    res.redirect(`/campgrounds/${found._id}`)

                }
            })
        }
    })
});
router.get('/:commentid/edit',(req,res)=>{
    Comment.findById(req.params.commentid,(err,foundComment)=>{
      if(!err){
        res.render('edit_comment',{post_id:req.params.id,comment:foundComment})
      }
      else{  
        res.redirect('/campgrounds')
      }
    })
  })
router.put('/:commentid', (req, res) => {
  let text = req.body.text;
  let comment = {text}
  Comment.findByIdAndUpdate(req.params.commentid, comment, (err, updatedComment) => {
      if (!err) {
        res.redirect(`/campgrounds/${req.params.id}`)
      }
      else {
        console.log(err)
        res.redirect('/campgrounds')
      }
    })
  })
router.delete('/:commentid',(req, res) => {
    Comment.findByIdAndRemove(req.params.commentid, (err) => {
      if (!err) {
        res.redirect(`/campgrounds/${req.params.id}`)
      }
      else {
        res.redirect('back')
      }
    })
  })
  

module.exports = router;