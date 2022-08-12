import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiLink } from '@elastic/eui'

interface footerProps {
  ab: string
}

function CardFooterContent(props: footerProps) {
  return (
    <>
      <EuiFlexGroup justifyContent="spaceEvenly" gutterSize="s" responsive={false} wrap>
        <EuiFlexItem grow={false}>
          <EuiButton color="success" iconType="eye">
            {' '}
            show{' '}
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton color="text"> edit </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton color="danger"> delete </EuiButton>
        </EuiFlexItem>
        {/* </EuiFlexGroup>

        <EuiFlexGroup justifyContent="flexEnd"> */}
        <EuiFlexItem grow={false}>
          <EuiLink href={props.ab} target="_blank">
            <EuiButton> More details... </EuiButton>
          </EuiLink>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  )
}

export default CardFooterContent
