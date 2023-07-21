import tw from 'twin.macro';

function NewsFeedTab() {
    return (
        <NewsFeedTabLayout>
        <StyledNewsFeedTab1>
            Tab 1
        </StyledNewsFeedTab1>
        <StyledNewsFeedTab2>
            Tab2
        </StyledNewsFeedTab2>
        <StyledNewsFeedTab3>
            Tab3
        </StyledNewsFeedTab3>
        </NewsFeedTabLayout>
    );
}

export default NewsFeedTab;

const NewsFeedTabLayout = tw.div`
flex-row
`

const StyledNewsFeedTab1 = tw.button`
w-[150px] h-[50px] mx-6 px-[15px] items-center justify-center border rounded-2xl bg-gray-100 mt-10
`

const StyledNewsFeedTab2 = tw.button`
w-[150px] h-[50px] mx-6 px-[15px] items-center justify-center border rounded-2xl bg-gray-100 mt-10
`

const StyledNewsFeedTab3 = tw.button`
w-[150px] h-[50px] mx-6 px-[15px] items-center justify-center border rounded-2xl bg-gray-100 mt-10
`