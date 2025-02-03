'use client'
import dynamic from 'next/dynamic';
import Modal from '@/components/modal/index';
import useStore from '@/store';
import { modelTypes } from '@/store/slices/modal-slice';
import Box from '@/components/ui/box';
// import { useRouter } from 'next/navigation';

const Login = dynamic(() => import('@/components/sessions/login'), { ssr: false });

const ModalUI: React.FC = () => {
    const { displayModal, modalView, closeModal } = useStore();
    // const router = useRouter();
    const toggleDialog = () => {
        closeModal()
    };
  
    // const toggleOrderModal = () => {
    //   router.replace('/');
    //   closeModal()
    // };
  
    // const SentToCartPage = () => {
    //   router.push('/cart');
    //   closeModal()
    // };
  
    if (!displayModal || !modalView) return null;
  
    switch (modalView) {
      case modelTypes.LOGIN_VIEW:
        return (
          <Modal open={displayModal} onClose={toggleDialog}>
            <Box>
              <Login />
            </Box>
          </Modal>
        );
    //   case modelTypes.ORDER_SUCCESS_VIEW:
    //     return (
    //       <Modal open={displayModal} onClose={toggleOrderModal}>
    //         <OrderSuccessModel onClose={toggleOrderModal} />
    //       </Modal>
    //     );
    //   case modelTypes.ORDER_FAILURE_VIEW:
    //     return (
    //       <Modal open={displayModal} onClose={toggleDialog}>
    //         <OrderFailureModel
    //           onClose={toggleDialog}
    //           text={state?.ui?.customMessage || ''}
    //         />
    //       </Modal>
    //     );
    //   case modelTypes.ORDER_FAILURE_VIEW:
    //     return (
    //       <Modal open={displayModal} onClose={toggleDialog}>
    //         <OrderFailureModel
    //           onClose={toggleDialog}
    //           text={state?.ui?.customMessage || ''}
    //         />
    //       </Modal>
    //     );
    //   case modelTypes.OUT_OF_STOCK_PRODUCT_VIEW:
    //     return (
    //       <Modal open={displayModal} onClose={SentToCartPage}>
    //         <OutOfStockProductModal onClose={SentToCartPage} />
    //       </Modal>
    //     );
        default:
            return ( <Modal open={displayModal} onClose={toggleDialog}>
                <Box>
                  <Login />
                </Box>
              </Modal>)
    }
  };
  export default ModalUI;