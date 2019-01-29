const campground = require("../models/campgrounds");
const Comments = require("../models/comments");
module.exports = {
    isLoggedIn : (req, res, next) =>{
        if (req.isAuthenticated()) {
          return next()
        }
        req.flash("error","Please login first")
        res.redirect('/user/login')
      },
      checkcampgroundOwner: (req, res, next) => {
        if (req.isAuthenticated()) {
          campground.findById(req.params.id, (err, post) => {
                if (!err) {
                    //user owns the campground
                    if (campground.author.id.equals(req.user._id)) {
                        next()
                    } else {
                        res.redirect('back')
                    }
                }
                else {
                    res.redirect('back')
                }
            })
        }
        else {
            res.send("You should be logged in to do that")
        }
    },
    checkCommentOwner : (req, res, next) => {
      if (req.isAuthenticated()) {
        Comments.findById(req.params.commentid, (err, comment) => {
          if (!err) {
            //user owns the campground
            if (comment.author.id.equals(req.user._id)) {
              next()
            } else {
              req.flash("error","Permission Denied")  
              res.redirect('back')
            }
          }
          else {
            req.flash("error",err.message)
            res.redirect('back')
          }
        })
      }
      else {
        res.send("You should be logged in to do that")
      }
    }
}