import NewsFeedHeader from './NewsFeedHeader';
import NewsFeedTab from './NewsFeedTab';
import NewsFeedList from './NewsFeedList';

function NewsFeed() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <NewsFeedHeader />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NewsFeedTab />
        <NewsFeedList />
      </div>
    </>
  );
}

export default NewsFeed;
