// algorithm to score posts according to fibonacci to quadratic scale

const baseFib = [0,1,2,3,5,8,13,21,34,55,89]

function tokenToVote(tokenCount) {
    if (tokenCount < 121) { // 121 because there is a bit of a leap between 89 (10th position) and 11^2
        for (i = 0; i < baseFib.length; i++) {
            if (tokenCount > baseFib[i]) {
                voteCount = i
            }
        }
    } else {
        voteCount = Math.round(Math.sqrt(tokenCount))
    }
    return voteCount
}
