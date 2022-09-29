const Pet = require("../models/pet");

const getPet = async (req, res) => {
  try {
    const pet = await Pet.find();

    if (pet.length > 0) {
      res.status(200).json(pet);
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }

};

const postPet = async(req,res) => {
    
        let newPet = req.body;
        let pet = new Pet(newPet);

        pet.save((err)=>{
            if(err){
                return res.status(400).json(err);
            }
            res.status(200).json(pet);
        })
    
}

exports.getPet = getPet;
exports.postPet = postPet;
