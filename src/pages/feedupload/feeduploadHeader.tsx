import tw from 'twin.macro';

function FeedUploadHead() {
    return (
        <FeedUploadHeader>
            글쓰기
        </FeedUploadHeader>
    );
} 

export default FeedUploadHead;
const FeedUploadHeader = tw.div`
font-bold text-xl mb-3 flex flex-row items-center pl-80 pt-5
`
