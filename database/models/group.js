import mongoose from "mongoose"

const GroupSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  active: { 
    type: Boolean, 
    required: true
  },
  lastInitiationDate: { 
    type: Date, 
    required: true
  },
  accessCode: {
    type: String,
    required: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  groupName: {
    type: String,
    required: true,
  },
  // options:{
  //   required:true,
  //   type: [{
  //     numOfDaysToPick: {type:Number,required:true},
  //     recurring:{type:String,required:true},
  //     minimumPeople:{type:Number, required:true}
  //   }]
  // }
});


export const Group = mongoose.model("Group", GroupSchema);
