// Sample social media links data
const socialMediaLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/w2quran",
    icon: "https://cdn.icon-icons.com/icons2/2429/PNG/512/facebook_logo_icon_147291.png",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/way2quran",
    icon: "https://cdn.icon-icons.com/icons2/4076/PNG/512/twitter_x_logo_icon_258917.png",
  },
  {
    name: "Sound Cloud",
    url: "https://soundcloud.com/way2quran",
    icon: "https://cdn.icon-icons.com/icons2/535/PNG/512/Sound-Cloud_icon-icons.com_52892.png",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/way2quran",
    icon: "https://cdn.icon-icons.com/icons2/836/PNG/512/Instagram_icon-icons.com_66804.png",
  },
];

const EmailTemplate = ({ content }) => {
  return `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Way2quran.com</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap"
        rel="stylesheet"
      />
    </head>
    <body bgcolor="#f9f9f9" style="overflow-x: hidden !important; font-family: 'Noto Naskh Arabic', serif; box-sizing: border-box;">      
      <table border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="white" width="650" style="border-radius: 10px; overflow-x: hidden; border: 2px solid #36b445; padding: 20px 10px; box-sizing: border-box;">
        <!-- Logo Image -->
        <tr>
          <td>
            <a href='https://way2quran.com' target='_blank'>
              <img src="https://storage.googleapis.com/way2quran_storage/imgs/social-media-logo.jpg" width="400px" style="display: block; margin: auto; padding-bottom: 25px;" alt="Way2Quran Logo"/>
            </a>
          </td>
        </tr>

        <!-- Content Paragraph -->
        <tr>
          <td style="text-align: center;" dir='rtl'>
            <p style="margin: 0px 40px; padding-bottom: 10px; line-height: 2; font-size: 16px; font-weight: 600; text-align: right; font-family: 'Noto Naskh Arabic', serif;">
              ${content.replace(/[\r\n]{2,}/g, "<br><br>")}
            </p>
          </td>
        </tr>

        <!-- Contact Button -->
        <tr>
          <td>
            <a target="_blank" href="https://way2quran.com/ar/contact-us" style="background-color: #36b445; color: white; padding: 7px 50px; text-decoration: none; cursor: pointer; display: block; margin: auto; width: fit-content; border-radius: 31px; font-weight: bold; font-size: 18px; margin-top: 30px; text-transform: uppercase; font-family: 'Noto Naskh Arabic', serif;">
              تواصل معنا
            </a>
          </td>
        </tr>

        <!-- Social Media Links -->
        <tr>
          <td align="center" valign="top" style="padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; padding-top: 20px;" class="social-icons">
            <table width="256" border="0" cellpadding="0" cellspacing="0" align="center" style= border-collapse: collapse; padding: 0;">
              <tr>
                ${socialMediaLinks
                  .map(
                    (link) => `
                    <td align="center" valign="middle" style="padding-left: 10px; padding-right: 10px; border-collapse: collapse;">
                      <a target="_blank" href="${link.url}" style="text-decoration: none;">
                        <img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; border: none; display: inline-block; color: #000000;" alt="${link.name}" title="${link.name}" width="44" height="44" src="${link.icon}" />
                      </a>
                    </td>
                  `
                  )
                  .join("")}
              </tr>
            </table>
          </td>
        </tr>

        <!-- Email Link -->
        <tr>
          <td align="center" valign="top" style="padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%; color: #000000; font-family: 'Noto Naskh Arabic', serif;" class="paragraph">
            <a href="mailto:info@way2quran.com" target="_blank" style="color: #127db3; font-size: 17px; font-weight: 400; line-height: 160%; text-decoration: none;">info@way2quran.com</a>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

module.exports = EmailTemplate;
