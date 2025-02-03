export const modelTypes = {
    LOGIN_VIEW: 'LOGIN_VIEW',
    REGISTER_VIEW: 'REGISTER_VIEW',
    FORGOT_PASSWORD_VIEW: 'FORGOT_PASSWORD_VIEW',
    PRODUCT_VIEW: 'PRODUCT_VIEW',
    ORDER_SUCCESS_VIEW: 'ORDER_SUCCESS_VIEW',
    ORDER_FAILURE_VIEW: 'ORDER_FAILURE_VIEW',
    OUT_OF_STOCK_PRODUCT_VIEW: 'OUT_OF_STOCK_PRODUCT_VIEW',
  } as const;
  
  type ModelType = typeof modelTypes[keyof typeof modelTypes];
  
  interface ModalState {
    displayModal: boolean;
    modalView: ModelType | null;
    customMessage: string | null;
  }
  
  type SetState = (
    partial: Partial<ModalState> | ((state: ModalState) => Partial<ModalState>),
    replace?: boolean
  ) => void;
  
  // Create the slice
  export const createModalSlice = {
    initialState: {
      displayModal: false,
      modalView: null,
      customMessage: null,
    } as ModalState,
    
    actions: (set: SetState) => ({
      openModal: (view: ModelType) =>
        set({
          displayModal: true,
          modalView: view,
          customMessage: null,
        }),
  
      closeModal: () =>
        set({
          displayModal: false,
          modalView: null,
          customMessage: null,
        }),
  
      openModalWithMessage: (view: ModelType, customMessage: string) =>
        set({
          displayModal: true,
          modalView: view,
          customMessage,
        }),
    }),
  };