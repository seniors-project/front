import tw from 'twin.macro';

function NewsFeedTab() {
    return (
        <NewsFeedTabLayout>
        <StyledNewsFeedTab1>
            카테고리
        </StyledNewsFeedTab1>
        <StyledNewsFeedTab2>
            카테고리
        </StyledNewsFeedTab2>
        <StyledNewsFeedTab3>
        카테고리
        </StyledNewsFeedTab3>
        </NewsFeedTabLayout>
    );
}

export default NewsFeedTab;

const NewsFeedTabLayout = tw.div`
flex-row
`

const StyledNewsFeedTab1 = tw.button`
w-[150px] h-[50px] mx-6 px-[15px] items-center justify-center  bg-gray-100 mt-10 text-[grey]
`

const StyledNewsFeedTab2 = tw.button`
w-[150px] h-[50px] mx-6 px-[15px] items-center justify-center  bg-gray-100 mt-10 text-[grey]
`

const StyledNewsFeedTab3 = tw.button`
w-[150px] h-[50px] mx-6 px-[15px] items-center justify-center  bg-gray-100 mt-10 text-[grey]
`