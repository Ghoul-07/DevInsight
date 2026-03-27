const axios = require('axios')

async function createAnalyzeController(req, res){


    const username = req.params.username
    
        try{
    
            const response = await axios.get(`https://api.github.com/users/${username}`);
        
            const user = response.data
    
            const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`)
    
            const repos = repoResponse.data
    
            let languageCount = {}
    
            repos.forEach((repo)=>{
                if(repo.language){
                    languageCount[repo.language] = (languageCount[repo.language] || 0) + 1   
                }
    
            });
    
    
            const sortedRepos = repos.sort((a,b)=>
                b.stargazers_count - a.stargazers_count
            )
    
            const topRepos = sortedRepos.slice(0, 5).map(repo=> ({
                name: repo.name,
                stars: repo.stargazers_count,
                language: repo.language
            }))
    
            let totalStars = 0
    
            repos.forEach((repo)=>{
                totalStars += repo.stargazers_count
            })
    
            const avgStars = totalStars / (repos.length || 1)
            const score = (user.followers * 2) + (repos.length * 1) + (avgStars * 4)
    
            res.status(200).json({
                message:"User data fetched",
    
                user:{
                    name : user.name,
                    login: user.login,
                    followers: user.followers
                },
                stats:{
                    message:"languages fetched",
                    totalrepos: repos.length,
                    languages: languageCount
                },
                topRepos: topRepos,
                Score : score
                
            })
    
        }catch(err){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
}

module.exports = {createAnalyzeController}