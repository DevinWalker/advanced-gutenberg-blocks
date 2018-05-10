import SearchProduct from '../../components/searchproduct'

const { Component } = wp.element

const {
  InspectorControls,
	ColorPalette,
} = wp.blocks

const {
  PanelBody,
	PanelColor,
} = wp.components

const { __ } = wp.i18n;

export default class Inspector extends Component {

  constructor( props ) {
    super( props )
  }

  render() {

		const { attributes: { productID, priceColor, buttonBackgroundColor }, setAttributes } = this.props

    return (
      <InspectorControls>

        <PanelBody title={ __( 'Choose a product', 'advanced-gutenberg-blocks' ) }>
          <SearchProduct { ...{ productID, setAttributes } } />
        </PanelBody>

				{ !! productID && (
					<span>
						<PanelColor
		          title={ __( 'Price color', 'advanced-gutenberg-blocks' ) }
		          colorValue={ priceColor }
		          >
		          <ColorPalette
		            value={ priceColor }
		            onChange={ priceColor => setAttributes( { priceColor } ) }
		          />
		        </PanelColor>

						<PanelColor
		          title={ __( 'Button background color', 'advanced-gutenberg-blocks' ) }
		          colorValue={ buttonBackgroundColor }
		          >
		          <ColorPalette
		            value={ buttonBackgroundColor }
		            onChange={ buttonBackgroundColor => setAttributes( { buttonBackgroundColor } ) }
		          />
		        </PanelColor>
					</span>
				) }
      </InspectorControls>
    )
  }
}
