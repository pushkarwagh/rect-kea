import { EuiCard, EuiFlexItem, EuiSpacer } from '@elastic/eui'
import CardFooterContent from './CardFooter'

interface BookInfo {
  id: number
  author: string
  country: string
  imageLink: string
  language: string
  link: string
  pages: number
  title: string
  year: number
}

interface CardProps {
  bookInfo: BookInfo
  index: number
}

function BookCard(props: CardProps) {
  return (
    <>
      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiCard
          textAlign="left"
          image={
            <div>
              <img src={props.bookInfo.imageLink} alt="Nature" />
            </div>
          }
          title={`Title: ${props.bookInfo.title}- Id: ${props.bookInfo.id}`}
          description={`Author: ${props.bookInfo.author}`}
          footer={
            <div>
              <CardFooterContent ab={props.bookInfo.link} id={Number(props.bookInfo.id)} />
            </div>
          }
        />
      </EuiFlexItem>
      <EuiSpacer />
    </>
  )
}

export default BookCard
