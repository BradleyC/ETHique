<template>
  <div class="reaction-unit">
    <div class="spending">
      <img
        class="increment increase"
        @click="increment(true)"
        src="../static/F0000.svg"
        alt="Increase"
      />
      <p class="p-centered-text">{{ voteStake }}</p>
      <img
        class="increment decrease"
        @click="increment()"
        src="../static/F0000.svg"
        alt="Decrease"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Reaction',
  /**
   * Explanation of "props" here:
   * This component takes an entire animation Component passed from parent in props.
   * The API for that is like this:
   * <ReactionContainer :animation="Animation Component Object"
   *                    :post-id="Post ID Var"
   *                    vote-type="1 for boost or 0 for burn">
   */
  props: {
    postId: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      voteStake: 0
    }
  },

  methods: {
    ...mapActions(['vote']),
    increment: function(add) {
      if (add) {
        this.voteStake++
        return
      }
      if (this.voteStake > 0) this.voteStake--
    }
    /**
     * Send vote to chain. The state/store will update the post in place in view
     * TODO: fixxxxx this to be a new lambda function
     */
    // async onVote() {
    //   if (!this.voteStake) {
    //     alert('Please confirm your vote stake')
    //     return
    //   }
    //   await this.vote({
    //     postId: this.postId,
    //     voteType: this.voteType,
    //     voteStake: this.voteStake
    //   }).catch(error => console.log(error))
    // }
  }
}
</script>
<style>
.reaction-unit {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.spending {
  font-size: 14px;
  width: 20px;
  display: inline-block;
}
.increment {
  width: 20px;
  cursor: pointer;
}
.increase {
  transform: rotate(90deg);
}
.decrease {
  transform: rotate(270deg);
}
.p-centered-text {
  text-align: center;
  margin-top: -6px;
  margin-bottom: -4px;
}
</style>
