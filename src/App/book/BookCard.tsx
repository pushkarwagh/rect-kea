import { EuiCard, EuiFlexItem, EuiSpacer } from '@elastic/eui'
import CardFooterContent from './CardFooter'
import { BookInfo } from "./types";

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
              <img src={props.bookInfo?.imageLink} alt="Nature" />
            </div>
          }
          title={`Title: ${props.bookInfo?.title}- Id: ${props.bookInfo?.id}`}
          description={`Author: ${props.bookInfo?.author}`}
          footer={
            <div>
              <CardFooterContent nav={props.bookInfo?.link} id={Number(props.bookInfo?.id)} />
            </div>
          }
        />
      </EuiFlexItem>
      <EuiSpacer />
    </>
  )
}

export default BookCard
