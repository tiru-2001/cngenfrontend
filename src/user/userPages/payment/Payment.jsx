import configuredUrl from '../../../utilities/request';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './payment.scss';
const Payment = () => {
  const navigate = useNavigate();
  const { bookingInfo, userLoginInfo } = useSelector(
    (state) => state.userslice
  );
  console.log(bookingInfo);
  const initPayment = (data) => {
    const options = {
      key: 'rzp_test_gpv7czy2nFRZJi',
      amount: data.amount,
      currency: data.currency,
      name: 'cngen',
      description: 'Test Transaction',
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await configuredUrl.post('/payment/verifyOrders', {
            email: userLoginInfo.email,
            phone: userLoginInfo.phone,
            ...bookingInfo,
            ...response,
          });
          console.log('dat inside the initpayment');
          console.log(data);
          if (data.success) {
            toast.success('Thank you for the payment');
            navigate('/user');
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const { data } = await configuredUrl.post('/payment/createOrders', {
        ...bookingInfo,
      });
      console.log('handlepayment');
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="payment">
      <button onClick={handlePayment}>Pay Now</button>
    </section>
  );
};

export default Payment;
