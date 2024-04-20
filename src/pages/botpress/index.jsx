import React, { useEffect } from 'react'
 
const Chatbot = () => {
  let script = document.createElement('script')

  useEffect(() => {
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '36464497-d1d0-4ccc-b2b4-9f997dc18a86',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '36464497-d1d0-4ccc-b2b4-9f997dc18a86',
      })
    }
  }, [])
 
  return <div id="webchat" />
}
 
export default Chatbot