(async () => {
    const axios = require('axios')
      
    const requests = 
        await Promise.all([
            axios.get("http://localhost:3000/?id=1"),
            axios.get("http://localhost:3000/?id=1"),
            axios.get("http://localhost:3000/?id=1"),
            axios.get("http://localhost:3000/?id=1")
        ])
    
    console.log(requests.filter(r => console.log('data->', r.data)))
})()

