import './style.scss'
import './editor.scss'

import classnames from 'classnames'

import Inspector from './inspect'

const { __ } = wp.i18n

const {
  registerBlockType,
  RichText,
} = wp.blocks

const { withAPIData } = wp.components
const { Fragment } = wp.element


export default registerBlockType(
  'advanced-gutenberg-blocks/addtocart',
  {
		title: __( 'Add to cart button', 'advanced-gutenberg-blocks' ),
    description: __( 'This button allow a customer to quickly add a product to cart', 'advanced-gutenberg-blocks' ),
    category: 'common',
    icon: 'cart',
    keywords: [
      __( 'purchase', 'advanced-gutenberg-blocks' ),
    ],
    attributes: {
			productID: {
        type: 'string',
      },
			hasIcon: {
        type: 'boolean',
				default: true,
      },
      icon: {
        type: 'string',
      },
      backgroundColor: {
				type: 'string',
      },
      label: {
        type: 'string',
				default: __( 'Add to cart', 'advanced-gutenberg-blocks' ),
      },
    },
		edit: withAPIData( ( { attributes } ) => {

				return ( attributes.productID ) ? {
					product: '/wc/v2/products/' + attributes.productID
				} : false

      } ) ( ( { product, focus, attributes, setAttributes } ) => {

				// Set default values (keep here to save them in html
				! attributes.icon && setAttributes( { icon: 'cart' } )
				! attributes.backgroundColor && setAttributes( { backgroundColor: '#9B6794' } )

				const onChangeProduct = product => {
	        setAttributes( {
						productID: product.id,
						label: __( 'Add', 'advanced-gutenberg-blocks' ) + ' ' + product.title.rendered + ' ' + __( 'to cart', 'advanced-gutenberg-blocks' )
					} )
	      }

				const onChangeLabel = value => {
	        setAttributes( { label: value } )
	      }

	      const onChangeURL = value => {
	        setAttributes( { url: value } )
	      }

				const onChangeBackgroundColor = value => {
	        setAttributes( { backgroundColor: value } )
	      }

	      const onChangeIcon = value => {
	        setAttributes( { icon: value } )
	      };

	      const toggleHasIcon = () => {
	        setAttributes( { hasIcon: ! attributes.hasIcon } )
	      }

				const currency = advancedGutenbergBlocksAddtocart.currency

				// Currency before / after
				const cb = ( currency == "$" ) ? currency : ''
				const ca = ( currency != "$" ) ? currency : ''

	      return (
	        <Fragment>
	          <Inspector { ...{ onChangeIcon, onChangeURL, toggleHasIcon, onChangeProduct, onChangeBackgroundColor , attributes } } />

		        <p className="wp-block-advanced-gutenberg-blocks-addtocart">
		          <a
								style={ {
			            backgroundColor: attributes.backgroundColor
			          } }
								className="wp-block-advanced-gutenberg-blocks-addtocart__button"
							>
		            { !! attributes.hasIcon && (
		              <span className={ classnames('dashicons', `dashicons-${attributes.icon}`) }></span>
		              )
		            }
		            <RichText
		              tagName="span"
									className="wp-block-advanced-gutenberg-blocks-addtocart__label"
		              value={ attributes.label }
		              onChange={ onChangeLabel }
		            />
								<span class="wp-block-advanced-gutenberg-blocks-addtocart__separator"> • </span>

								{ !! product && typeof product.data !== "undefined" ? (
									<div className="wp-block-advanced-gutenberg-blocks-addtocart__price">

										{ !! product.data.sale_price != "" ? (
											<span>
												<span>{ cb }{ product.data.sale_price }{ ca }</span>
												<del className="wp-block-advanced-gutenberg-blocks-addtocart__sale">{ cb }{ product.data.regular_price }{ ca }</del>
											</span>
											) : (
												<span>{ cb }{ product.data.price }{ ca }</span>
											)
										}
									</div>
								) : (
									<span>{ cb }0{ ca }</span>
								) }
							</a>
						</p>
					</Fragment>
	      )
			} ),
		save: () => {
      return null
    },
  },
);
