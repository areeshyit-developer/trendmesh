// 1. Database ka naam set karein
use('dbconnect');

// 2. Data insert karein
db.getCollection('instagramposts').insertMany([
{
  "_id": ObjectId("69db8e29a32a6f42767ff869"),
  "igUserId": "17841480716430017",
  "title": "Alhamdulila",
  "message": "Sabr. Shukar. Alhamdulillah. 🤍",
  "imageUrl": "https://res.cloudinary.com/djahtzljz/image/upload/v1775996329/trendmesh/instagram/gykf6gwefra0tysdptly.jpg",
  "platforms": ["instagram"],
  "status": "published",
  "scheduledTime": new Date("2026-04-19T12:20:00.000Z"),
  "publishedAt": null,
  "likes": 0,
  "comments": [],
  "createdAt": new Date("2026-04-12T12:20:57.069Z"),
  "updatedAt": new Date("2026-04-22T06:57:18.691Z"),
  "__v": 0
},
{
  "_id": ObjectId("69dbb830da56a3c7154c2a33"),
  "igUserId": "17841480716430017",
  "title": "Stay patient.",
  "message": "Patience is never wasted — Allah is with those who wait.",
  "imageUrl": "https://res.cloudinary.com/djahtzljz/image/upload/v1776007089/trendmesh/instagram/l872wf8zgdtmb1xyfmvb.jpg",
  "platforms": ["instagram"],
  "status": "published",
  "scheduledTime": new Date("2026-04-20T15:20:00.000Z"),
  "publishedAt": null,
  "likes": 0,
  "comments": [],
  "createdAt": new Date("2026-04-12T15:20:16.664Z"),
  "updatedAt": new Date("2026-04-22T06:57:27.402Z"),
  "__v": 0
},
{
  "_id": ObjectId("69ea0c978e7812fad012d3d2"),
  "igUserId": "17841480716430017",
  "title": "Trust",
  "message": "TRUST ALLAH'S TIMMING,\r\nITS ALWAYS PERFECT.",
  "imageUrl": "https://res.cloudinary.com/djahtzljz/image/upload/v1776946190/trendmesh/instagram/nueqqzvand8kablublry.jpg",
  "platforms": ["instagram"],
  "status": "published",
  "scheduledTime": new Date("2026-04-29T12:11:00.000Z"),
  "publishedAt": null,
  "likes": 0,
  "comments": [],
  "createdAt": new Date("2026-04-23T12:12:07.273Z"),
  "updatedAt": new Date("2026-05-02T08:24:10.834Z"),
  "__v": 0
}
]);