// algorithm to score posts according 

const baseFib = [0,1,2,3,5,8,13,21,34,55,89]

function tokenToVote(tokenCount) {
    if (tokenCount < 121) { // 121 because there is a bit of a leap between 89 (10th position) and 11^2
        for (b in baseFib) {
            while (tokenCount > b)
            voteCount = indexOf(b)
        }
    } else {
        voteCount = Math.round(Math.sqrt(tokenCount))
    }
    return voteCount
}
