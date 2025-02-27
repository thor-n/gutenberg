/**
 * Composite is a component that may contain navigable items represented by
 * Composite.Item. It's inspired by the WAI-ARIA Composite Role and implements
 * all the keyboard navigation mechanisms to ensure that there's only one
 * tab stop for the whole Composite element. This means that it can behave as
 * a roving tabindex or aria-activedescendant container.
 *
 * @see https://ariakit.org/components/composite
 */

/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';

/**
 * WordPress dependencies
 */
import { useMemo, forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import type { WordPressComponentProps } from '../context';
import { CompositeContext } from './context';
import { CompositeGroup } from './group';
import { CompositeGroupLabel } from './group-label';
import { CompositeHover } from './hover';
import { CompositeItem } from './item';
import { CompositeRow } from './row';
import { CompositeTypeahead } from './typeahead';
import type { CompositeProps } from './types';

/**
 * Renders a widget based on the WAI-ARIA [`composite`](https://w3c.github.io/aria/#composite)
 * role, which provides a single tab stop on the page and arrow key navigation
 * through the focusable descendants.
 *
 * @example
 * ```jsx
 * import { Composite, useCompositeStore } from '@wordpress/components';
 *
 * const store = useCompositeStore();
 * <Composite store={store}>
 *   <Composite.Item>Item 1</Composite.Item>
 *   <Composite.Item>Item 2</Composite.Item>
 * </Composite>
 * ```
 */
export const Composite = Object.assign(
	forwardRef<
		HTMLDivElement,
		WordPressComponentProps< CompositeProps, 'div', false >
	>( function Composite(
		{ children, store, disabled = false, ...props },
		ref
	) {
		const contextValue = useMemo(
			() => ( {
				store,
			} ),
			[ store ]
		);

		return (
			<Ariakit.Composite
				disabled={ disabled }
				store={ store }
				{ ...props }
				ref={ ref }
			>
				<CompositeContext.Provider value={ contextValue }>
					{ children }
				</CompositeContext.Provider>
			</Ariakit.Composite>
		);
	} ),
	{
		/**
		 * Renders a group element for composite items.
		 *
		 * @example
		 * ```jsx
		 * import { Composite, useCompositeStore } from '@wordpress/components';
		 *
		 * const store = useCompositeStore();
		 * <Composite store={store}>
		 *   <Composite.Group>
		 *     <Composite.GroupLabel>Label</Composite.GroupLabel>
		 *     <Composite.Item>Item 1</Composite.Item>
		 *     <Composite.Item>Item 2</Composite.Item>
		 *   </CompositeGroup>
		 * </Composite>
		 * ```
		 */
		Group: CompositeGroup,
		/**
		 * Renders a label in a composite group. This component must be wrapped with
		 * `Composite.Group` so the `aria-labelledby` prop is properly set on the
		 * composite group element.
		 *
		 * @example
		 * ```jsx
		 * import { Composite, useCompositeStore } from '@wordpress/components';
		 *
		 * const store = useCompositeStore();
		 * <Composite store={store}>
		 *   <Composite.Group>
		 *     <Composite.GroupLabel>Label</Composite.GroupLabel>
		 *     <Composite.Item>Item 1</Composite.Item>
		 *     <Composite.Item>Item 2</Composite.Item>
		 *   </CompositeGroup>
		 * </Composite>
		 * ```
		 */
		GroupLabel: CompositeGroupLabel,
		/**
		 * Renders a composite item.
		 *
		 * @example
		 * ```jsx
		 * import { Composite, useCompositeStore } from '@wordpress/components';
		 *
		 * const store = useCompositeStore();
		 * <Composite store={store}>
		 *   <Composite.Item>Item 1</Composite.Item>
		 *   <Composite.Item>Item 2</Composite.Item>
		 *   <Composite.Item>Item 3</Composite.Item>
		 * </Composite>
		 * ```
		 */
		Item: CompositeItem,
		/**
		 * Renders a composite row. Wrapping `Composite.Item` elements within
		 * `Composite.Row` will create a two-dimensional composite widget, such as a
		 * grid.
		 *
		 * @example
		 * ```jsx
		 * import { Composite, useCompositeStore } from '@wordpress/components';
		 *
		 * const store = useCompositeStore();
		 * <Composite store={store}>
		 *   <Composite.Row>
		 *     <Composite.Item>Item 1.1</Composite.Item>
		 *     <Composite.Item>Item 1.2</Composite.Item>
		 *     <Composite.Item>Item 1.3</Composite.Item>
		 *   </Composite.Row>
		 *   <Composite.Row>
		 *     <Composite.Item>Item 2.1</Composite.Item>
		 *     <Composite.Item>Item 2.2</Composite.Item>
		 *     <Composite.Item>Item 2.3</Composite.Item>
		 *   </Composite.Row>
		 * </Composite>
		 * ```
		 */
		Row: CompositeRow,
		/**
		 * Renders an element in a composite widget that receives focus on mouse move
		 * and loses focus to the composite base element on mouse leave. This should
		 * be combined with the `Composite.Item` component.
		 *
		 * @example
		 * ```jsx
		 * import { Composite, useCompositeStore } from '@wordpress/components';
		 *
		 * const store = useCompositeStore();
		 * <Composite store={store}>
		 *   <Composite.Hover render={ <Composite.Item /> }>
		 *     Item 1
		 *   </Composite.Hover>
		 *   <Composite.Hover render={ <Composite.Item /> }>
		 *     Item 2
		 *   </Composite.Hover>
		 * </Composite>
		 * ```
		 */
		Hover: CompositeHover,
		/**
		 * Renders a component that adds typeahead functionality to composite
		 * components. Hitting printable character keys will move focus to the next
		 * composite item that begins with the input characters.
		 *
		 * @example
		 * ```jsx
		 * import { Composite, useCompositeStore } from '@wordpress/components';
		 *
		 * const store = useCompositeStore();
		 * <Composite store={store} render={ <CompositeTypeahead /> }>
		 *   <Composite.Item>Item 1</Composite.Item>
		 *   <Composite.Item>Item 2</Composite.Item>
		 * </Composite>
		 * ```
		 */
		Typeahead: CompositeTypeahead,
		/**
		 * The React context used by the composite components. It can be used by
		 * to access the composite store, and to forward the context when composite
		 * sub-components are rendered across portals (ie. `SlotFill` components)
		 * that would not otherwise forward the context to the `Fill` children.
		 *
		 * @example
		 * ```jsx
		 * import { Composite } from '@wordpress/components';
		 * import { useContext } from '@wordpress/element';
		 *
		 * const compositeContext = useContext( Composite.Context );
		 * ```
		 */
		Context: CompositeContext,
	}
);
