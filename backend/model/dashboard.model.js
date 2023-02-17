const mongoose=require('mongoose')
const dashboardschema=mongoose.Schema({

   maps:[]

})
const DashboardModel=mongoose.model("map",dashboardschema)
module.exports={DashboardModel}