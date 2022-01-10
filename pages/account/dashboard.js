<<<<<<< HEAD
import { parseCookies } from '@/helpers/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';

const DashboardPage = ({ events, token }) => {
  const router = useRouter();
   
  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      // Delete uploaded photo
      const photoIndex = events.findIndex(evt => evt.id === id);
      const resPhoto = await fetch(`${API_URL}/upload/files/${events[photoIndex].image.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const photoData = await resPhoto.json();
      if (!resPhoto.ok) {
        toast.error(photoData.message);
      }
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent
            key={evt.id}
            evt={evt}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
=======
import Layout from '@/components/Layout';

const DashboardPage = () => {
  return (
    <Layout title="User Dashboard">
      <h1>Dashboard</h1>
>>>>>>> 26eca3579a08165836ebf2036a7e5c61a380f055
    </Layout>
  );
};

export default DashboardPage;
<<<<<<< HEAD

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
=======
>>>>>>> 26eca3579a08165836ebf2036a7e5c61a380f055
