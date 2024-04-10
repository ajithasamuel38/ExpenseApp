const User = require('../models/userModel');

exports.create =  (req, res, next) => {
   
   
         User.create(req.body).then((result)=>{
            console.log(req.body); 
            res.status(201).json(result); 
         }).catch((err)=>{
            console.error("Error creating user:", err);
         
         })
        
       
    
};

exports.getAll = (req, res, next) => {
  
        
        User.findAll().then((result)=>{
            res.status(200).json(result);
        }).
       
        
    catch ((error) =>{
        
        console.error("Error retrieving appointments:", error);
       
    })
};

exports.delete = async (req, res, next) => {
    
    
       
        const userId = req.params.userId;
        
       
         User.findByPk(userId).then((result)=>{
            result.destroy();
            res.status(200).json({ message: "User deleted successfully" });
        }). catch ((error)=>{
            console.error("Error deleting user:", error);
            
        } )
        
    }

    exports.getEditProduct = (req, res, next) => {
        const prodId = req.params.userId;
      
        console.log(prodId);
      
        User.findByPk(prodId)
            .then(user => {
                if (!user) {
                    // If user is not found, send a 404 error response
                    return res.status(404).json({ error: "User not found" });
                }
                // Send the user data in the response
                res.status(200).json({ user: user });
            })
            .catch(err => {
                // Handle errors properly and send an error response
                console.log(err);
                res.status(500).json({ error: "Internal server error" });
            });
    };
      
      exports.postEditProduct = (req, res, next)=>{
        const userId = req.params.userId;
        const updatedFields = req.body; 
        console.log(updatedFields)
       User.findByPk(userId)
          .then(user => {
              if (!user) {
                  return res.status(404).json({ message: 'User not found' });
              }
              // Update the user's fields with the new values
              return user.update(updatedFields);
          })
          .then(updatedUser => {
              console.log('User updated successfully:', updatedUser);
              res.status(200).json({ message: "User updated successfully" });
          })
          .catch(err => {
              console.error('Error updating user:', err);
              res.status(500).json({ message: 'Internal server error' });
          });
          
      }