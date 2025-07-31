import DBTHeader from '@/components/DBTHeader';
import DBTAbout from '@/components/DBTAbout';
import DBTTherapies from '@/components/DBTTherapies';
import DBTServices from '@/components/DBTServices';
import DBTProcess from '@/components/DBTProcess';
import DBTTeam from '@/components/DBTTeam';
import DBTContact from '@/components/DBTContact';
import DBTFooter from '@/components/DBTFooter';

const Home2 = () => {
  return (
    <div className="min-h-screen bg-white">
      <DBTHeader />
      <DBTAbout />
      <DBTTherapies />
      <DBTServices />
      <DBTProcess />
      <DBTTeam />
      <DBTContact />
      <DBTFooter />
    </div>
  );
};

export default Home2;
