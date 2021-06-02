import React, { forwardRef, useEffect, useRef } from 'react';
import { useClickOutside, useSharedRef, useTransition } from '../../hooks';
import { TransitionRendererProps } from '../../utils';
import { Layer } from '../Layer';
import { Modal, ModalProps } from './Modal';

export interface ModalTransitionProps
  extends TransitionRendererProps,
    ModalProps {}

export const ModalTransition = forwardRef<HTMLDivElement, ModalTransitionProps>(
  ({ handleClose, handleCloseEnd, isOpen, ...rest }, ref) => {
    const modalRef = useSharedRef<HTMLDivElement>(null, [ref]);
    const [isModalMounted, modalTransitionProps] = useTransition<
      HTMLDivElement
    >(modalRef, isOpen);

    const layerRef = useRef<HTMLDivElement>(null);
    const [isLayerMounted, layerTransitionProps] = useTransition<
      HTMLDivElement
    >(layerRef, isOpen);

    const wasMountedRef = useRef(false);
    useEffect(() => {
      if (wasMountedRef.current && !isLayerMounted) {
        handleCloseEnd?.();
      }
      if (isModalMounted || isLayerMounted) {
        wasMountedRef.current = true;
      }
    }, [isModalMounted, isLayerMounted]);

    useClickOutside(modalRef, e => {
      // Do not close if targeting another modal actually.
      if (layerRef.current?.isSameNode(e.target as Element)) {
        handleClose?.();
      }
    });

    useEffect(() => {
      modalRef.current?.focus();
    }, []);

    if (!isLayerMounted) {
      return null;
    }

    return (
      <Layer ref={layerRef} {...layerTransitionProps} kind="backdrop">
        {isModalMounted && (
          <Modal ref={modalRef} {...modalTransitionProps} {...rest} />
        )}
      </Layer>
    );
  }
);
