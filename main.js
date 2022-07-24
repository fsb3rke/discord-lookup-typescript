const express = require('express');
let discord = require('discord.js')
const app = express();
let client = new discord.Client()

function fetchUser(id, res) {
    m_user = {
        userId: "",
        username: "",
        created_at: "",
        avatarUrl: "",
    }
    client.users.fetch(id).then(user => {
        m_user.username = user.username
        m_user.userId = user.id
        m_user.created_at = String(user.createdAt)
        m_user.avatarUrl = user.avatarURL().replace(".webp", ".png?size=1024")
        //console.log(`\tID: ${m_user.userId}\n\tUSERNAME: ${m_user.username}\n\tCREATED: ${m_user.created_at}\n\tAVATAR: ${m_user.avatarUrl}`, m_user)
        
        let page_source = `<center><div><img style="width: 8rem; height: 8rem;" src="${m_user.avatarUrl}"></div><br><br><br><br><div>ID: ${m_user.userId}</div><br><br><div>username: ${m_user.username}</div><br><br><div>created: ${m_user.created_at}</div><br><br>`
        res.send(page_source)
    })
    
}

client.on("ready", () => {

    app.param("id", (req, res ,next, id) => {
        let modified = String(id)
        req.id = modified
        next()
    })

    app.get("/api/users/:id", (req, res) => {
        console.log(req.id);
        fetchUser(req.id, res)
        // res.send(```
        // <center>
        // <div>
        // <img src="${user.avatarUrl}">
        // </div>
        // <br><br><br><br>
        // <div>
        // ID: ${user.userId}
        // </div>
        // <br><br>
        // <div>
        // username: ${user.username}
        // </div>
        // <br><br>
        // <div>
        // created: ${user.created_at}
        // </div>
        // <br><br>
        
        // ```)
    })

    const port = process.env.PORT || 8080;

    app.listen(port, function () {
        console.log("STATUS: 200 OK");
    })
})



client.login("")

module.exports.fetchUser = fetchUser