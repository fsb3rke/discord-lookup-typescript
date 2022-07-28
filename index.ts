// AUTHOR : Berke (fsb3rke)

import DiscordJS, { IntentsBitField } from 'discord.js'
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

const app = express();
const port = process.env.PORT || 8080;

const client = new DiscordJS.Client({
  intents: [
    IntentsBitField.Flags.Guilds,
  ]
})

client.on("ready", () => {
  console.log("200")



  app.get("/api/users/:id", (req, res) => {
    let m_user = {
      bannerUrl: "",
      avatarUrl: "",
      username: "",
      createdAt: "",
      bannerColor: "",
      userId: "",
    }
    client.users.fetch(req.params.id)
      .then(user => {

        m_user.bannerUrl = String(user.bannerURL()?.replace(".webp", ".png?size=1024").replace(".gif", ".gif?size=1024"))
        m_user.avatarUrl = String(user.avatarURL()?.replace(".webp", ".png?size=1024").replace(".gif", ".gif?size=1024"))
        m_user.username = user.tag
        m_user.createdAt = user.createdAt.toUTCString()
        if (user.accentColor) {
          m_user.bannerColor = String(user.accentColor)
        }
        m_user.userId = user.id

        res.send(m_user)
      })
  })

  app.get("/web/users/:id", (req, res) => {
    let m_user = {
      bannerUrl: "",
      avatarUrl: "",
      username: "",
      createdAt: "",
      bannerColor: "",
      userId: "",
    }
    client.users.fetch(req.params.id)
      .then(user => {

        m_user.bannerUrl = String(user.bannerURL()?.replace(".webp", ".png?size=1024").replace(".gif", ".gif?size=1024"))
        m_user.avatarUrl = String(user.avatarURL()?.replace(".webp", ".png?size=1024").replace(".gif", ".gif?size=1024"))

        let html_banner_section
        let html_avatar_section

        if (m_user.bannerUrl != "undefined") {
          html_banner_section = `
          <div class="col-md-2 withdarker picbx" style="text-align: center;">
              <a
                href="${m_user.bannerUrl}"
                target="_blank"
                ><img
                  src="${m_user.bannerUrl}"
                  class="avyimg"
                  style="width: 100%;height: 8rem;"
              /></a>
            </div>`
        } else {
          html_banner_section = "EMPTY"
        }

        if (m_user.avatarUrl != "undefined") {
          html_avatar_section = `
          <div class="col-md-2 withdarker picbx" style="text-align: center;">
            <a
              href="${m_user.avatarUrl}"
              target="_blank"
              ><img
                src="${m_user.avatarUrl}"
                class="avyimg"
                style="border-radius: 50%;width: 8rem;height: 8rem;"
            /></a>
          </div>`
        } else {
          html_avatar_section = "EMPTY"
        }

        m_user.username = user.tag
        m_user.createdAt = user.createdAt.toUTCString()
        m_user.bannerColor = String(user.accentColor)
        m_user.userId = user.id

        let html_content = `
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
          ${html_banner_section}
          ${html_avatar_section}
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
            <p>
              <span class="fas fa-palette"></span>
              <strong>Banner Color:</strong>
              <span class="resulth"
                ><span style="border-radius: 2px;vertical-align: sub;display: inline-block;height: 1.1rem;width: 4.5rem;background-color: ${m_user.bannerColor};"></span></span></p>
          </div>
        </div>
      </div>
      <br /><br />
    </div>
  </center>
  </body>
  </html>
          `
        res.send(html_content)
    })
  })

  app.listen(port)
})

client.login(process.env.TOKEN)
