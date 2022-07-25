const express = require('express');
let discord = require('discord.js')
const app = express();
let client = new discord.Client()

function fetchUser(id, res) {
    let m_user = {
        userId: "",
        username: "",
        createdAt: "",
        avatarUrl: "",
    }
    client.users.fetch(id).then(user => {
        m_user.username = user.username
        m_user.userId = user.id
        m_user.createdAt = String(user.createdAt)
        m_user.avatarUrl = user.avatarURL().replace(".webp", ".png?size=1024")
        //console.log(`\tID: ${m_user.userId}\n\tUSERNAME: ${m_user.username}\n\tCREATED: ${m_user.created_at}\n\tAVATAR: ${m_user.avatarUrl}`, m_user)
        
        let html_page_source = `<center><div><img style="width: 8rem; height: 8rem;" src="${m_user.avatarUrl}"></div><br><br><br><br><div>ID: ${m_user.userId}</div><br><br><div>username: ${m_user.username}</div><br><br><div>created: ${m_user.created_at}</div><br><br>`
        let m_html_page_source = `<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Discord Lookup</title>
    <style>
      * {
        font-family: sans-serif;
        color: white;
      }

      .header {
        font-size: 3rem;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 15px;
      }

      body {
        background-color: #343d46;
        font-size:24px;
      }

      .under-header {
        font-size: 2rem;
      }

      .container {
        background-color: rgb(0, 124, 207);
        width: 75%;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 8px;
      }

      @keyframes wiggle {
        0% {
          transform: rotate(0deg);
        }
        80% {
          transform: rotate(0deg);
        }
        85% {
          transform: rotate(5deg);
        }
        95% {
          transform: rotate(-5deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }

      .center {
        position: absolute;
        top: 25%;
        right: 50%;
        transform: translate(50%, -25%);
      }

      br {
        visibility: hidden;
      }

      .m_img {
        width: 8rem;
        height: 8rem;
      }

      *::selection {
        background-color: rgba(14, 14, 14, 0.2);
      }

      .resulth {
        font-size:40px;
      }

      strong {
        -webkit-user-select: none;
        font-size:24px;
      }
    </style>
  </head>
  <body>
    <center>
      <div class="center">
        <div class="header">
          <div class="row" style="justify-content: center; margin-top: 4rem">
            <div class="col-md-2 withdarker picbx" style="text-align: center;">
              <a
                href="${m_user.avatarUrl}"
                target="_blank"
                ><img
                  src="${m_user.avatarUrl}"
                  class="avyimg"
                  style="border-radius: 50%;width: 8rem;height: 8rem;"
              /></a>
            </div>
            <div class="col-md-4 withdarker">
              <!---->
              <p>
                <span class="fas fa-user"></span> <strong>User ID:</strong>
                <span class="resulth">${m_user.userId}</span>
              </p>
              <p>
                <span class="fas fa-hashtag"></span> <strong>Username:</strong>
                <span class="resulth" style="color: rgb(228, 154, 255)"
                  ><span>${m_user.username}</span
                  ><!----></span
                >
              </p>
              <p>
                <span class="fas fa-asterisk"></span> <strong>Created:</strong>
                <span class="resulth" style="color: rgb(129, 200, 134)"
                  >${m_user.createdAt}</span
                >
              </p>
              <!-- <p>
                <span class="fas fa-palette"></span>
                <strong>Banner Color:</strong>
                <span class="resulth"
                  ><span style="border-radius: 2px;vertical-align: sub;display: inline-block;height: 1.1rem;width: 4.5rem;background-color: rgb(23, 233, 26);"></span></span></p> -->
            </div>
          </div>
        </div>
        <br /><br />
      </div>
    </center>
  </body>
</html>`
        let json_page_source = JSON.stringify(m_user)
        res.send(m_html_page_source)
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
    })

    const port = process.env.PORT || 8080;

    app.listen(port, function () {
        console.log("STATUS: 200 OK");
    })
})

client.login("discord_token")

module.exports.fetchUser = fetchUser
