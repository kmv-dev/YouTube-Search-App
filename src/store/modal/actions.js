export default {
  showModal({ commit }, value) {
    commit("setShowModal", value);
  },
  addModalDataToState({ commit }, payload) {
    commit("setModalData", payload);
  },
};
