const axios = require("axios");
const { response } = require("../app");

async function githubCompareController(req, res){
    const {usernames} = req.body

    if(!usernames || usernames.length === 0){
        return res.status(401).json({message:"user names are required"})
    }

    try{

        const headers = {
            Authorization : `token ${process.env.GITHUB_TOKEN}`
        }

        const usersData = await Promise.all(
            usernames.map( async (username)=>{

                const userRes = await axios.get(
                    `https://api.github.com/users/${username}`,
                    { headers }
                );

                const repoRes = await axios.get(`
                    https://api.github.com/users/${username}/repos`,
                    { headers }
                );
                
                return{
                    username,
                    user: userRes.data,
                    repos: repoRes.data
                }
            })
        );

        

        const analyzed = usersData.map(analyzeUser);

        const withScores = analyzed.map(user =>{
            return{
                ...user,
                score: calculateScore(user)
            }
        })

        const ranked = withScores.sort((a,b) => b.score - a.score)

        const rankedWithPositions = ranked.map((user, index)=>({
            ...user,
            rank: index + 1
        }))

        res.status(200).json({
            totalUsers: ranked.length,
            data : rankedWithPositions
        })

    } catch(err){
       
        res.status(401).json({message:"server error"})
    }
    
}

function analyzeUser(data){

    const totalStars = data.repos.reduce(
        (sum, repo) => sum + repo.stargazers_count, 0
    )

    const totalForks = data.repos.reduce(
        (sum, repo) => sum + repo.forks_count, 0
    );

    return{
        username: data.username,
        followers: data.user.followers,
        publicRepos: data.user.public_repos,
        totalStars,
        totalForks
    }
}

function calculateScore(user){
    return (
        user.totalStars * 3 + user.totalForks * 2 + user.publicRepos * 1 + user.followers * 2
    )
}

module.exports = {
    githubCompareController
}