const express = require("express")
let { DashboardModel} = require("../model/dashboard.model")



const mapsRoute = express.Router()



mapsRoute.post("/createMap", async (req, res) => {
    let {maps } = req.body

    
        try {
            let newMap = new DashboardModel({ maps})
            await newMap.save()
            res.send({ "msg": "new map added" })
        } catch (error) {
            res.send({ "msg": error })
        }
    
})

// --------get maps list -----//
mapsRoute.get("/getMaps", async (req, res) => {

    try {
        let maps = await DashboardModel.find()

        res.send({ "msg": maps })
    } catch (error) {
        res.send({ "msg": error })
    }
})
module.exports = { mapsRoute }