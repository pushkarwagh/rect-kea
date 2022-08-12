import { EuiButton, EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiSpacer, EuiTitle } from '@elastic/eui'
import { useActions, useValues } from 'kea'
import { useEffect } from 'react'
import { bookLogic } from './bookLogic'
import CardFooterContent from './Footer'

function Books() {
  const { books } = useValues(bookLogic)
  const { addBook, editBook, deleteBook } = useActions(bookLogic)

  return (
    <div>
      <EuiTitle size="l">
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}> Books-Library </h1>
      </EuiTitle>
      <EuiSpacer />

      <EuiFlexGroup gutterSize="l" style={{ display: "table-caption", margin: "auto", width:"50%" }}>
        {books.slice(0, 10).map((book, index) => {
          return (
            <>
              <EuiFlexItem style={{ minWidth: 300 }} key={book.id}>
                <EuiCard
                  textAlign="left"
                  image={
                    <div>
                      <img src={book.imageLink} alt="Nature" />
                    </div>
                  }
                  title={`Title: ${book.title}- ${index}`}
                  description={`Author: ${book.author}`}
                  footer={
                    <div>
                      <CardFooterContent ab={book.link} />
                    </div>
                  }
                />
              </EuiFlexItem>
              <EuiSpacer />
            </>
          )
        })}
      </EuiFlexGroup>

      {/* <EuiFlexGroup gutterSize="l">
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            image={
              <div>
                <img src="https://source.unsplash.com/400x200/?Nature" alt="Nature" />
              </div>
            }
            title="Elastic in Nature"
            description="Example of a card's description. Stick to one or two sentences."
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            image="https://source.unsplash.com/400x200/?Water"
            title="Elastic in Water"
            description="Example of a card's description. Stick to one or two sentences."
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            textAlign="left"
            href="https://elastic.github.io/eui/"
            image="https://source.unsplash.com/400x200/?City"
            icon={<EuiIcon size="xxl" type="logoBeats" />}
            title={'Beats in the City'}
            description="This card has an href and should be a link."
          />
        </EuiFlexItem>
      </EuiFlexGroup> */}
    </div>
  )
}

export default Books
