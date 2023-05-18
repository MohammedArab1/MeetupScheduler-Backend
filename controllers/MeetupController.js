import bcrypt from "bcrypt"
import { Meetup } from "../database/models/meetup.js";


export const createMeetup = async (req,res) => {
    const { groupId,deadLine,location,name,description,dateToPickFrom,dateToPickTo,minPplNeeded,numOfDatesToPick } = req.body;
    const active = true
    const creationDate = Date.now()
    const meetup = new Meetup({group:groupId,deadLine,active,creationDate,location,name,description,dateToPickFrom,dateToPickTo,minPplNeeded,numOfDatesToPick})
    await meetup.save()
    res.status(201).json(meetup)
}

export const deleteMeetup = async (req,res) => {
        try {
            const deletedMeetup = await Meetup.findByIdAndDelete(req.params.meetupId)
            if (!deletedMeetup) {
                return res.status(404).json({ error:"No meetup found with this id." })
            }
            return res.status(200).send(deletedMeetup)
        } catch (error) {
            return res.status(500).json({ error:error.message });
        }
    }

export const getMeetupByGroupId = async (req,res, next) => {
    try {
        const meetup = await Meetup.find({group:req.params.groupId})
        if (!meetup) {
            return res.status(404).json({ error:"No meetup found with this group id." })
        }
        return res.status(200).send(meetup)
    } catch (error) {
        //if error caught, send to error handler middleware
        next(error);
        // return res.status(500).json({ error:error.message });
    }
}

